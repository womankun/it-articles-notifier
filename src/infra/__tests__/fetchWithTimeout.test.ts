import { fetchWithTimeout } from "../http.ts";

describe("fetchWithTimeout", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test("正常にfetchできる場合は1回目で成功する", async () => {
    const mockResponse = new Response("OK", { status: 200 });
    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await fetchWithTimeout("https://example.com",  {}, { timeoutMs: 5000, retryCount: 3 });
    expect(result).toBe(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("タイムアウトしてリトライ後に成功する", async () => {
    const abortError = new DOMException("Aborted", "AbortError");
    (global.fetch as jest.Mock)
      .mockImplementationOnce(() => new Promise((_, reject) => setTimeout(() => reject(abortError), 6000)))
      .mockResolvedValueOnce(new Response("OK", { status: 200 }));

    const promise = fetchWithTimeout("https://example.com", {}, { timeoutMs: 5000, retryCount: 3 });

    jest.advanceTimersByTime(6000); // 1回目タイムアウト
    await Promise.resolve(); // タイマー反映

    jest.advanceTimersByTime(100); // 2回目成功
    const result = await promise;

    expect(result.status).toBe(200);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test("すべてタイムアウトした場合はエラーをthrowする", async () => {
    const abortError = new DOMException("Aborted", "AbortError");
    (global.fetch as jest.Mock).mockImplementation(() =>
      new Promise((_, reject) => setTimeout(() => reject(abortError), 200))
    );

    const promise = fetchWithTimeout("https://example.com",  {}, { timeoutMs: 100, retryCount: 2 });

    jest.advanceTimersByTimeAsync(200 * 3); // 3回分タイムアウト
    await expect(promise).rejects.toThrow("fetchWithTimeout: すべての再試行に失敗しました");
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  test("fetchがAbortError以外で失敗した場合は即throw", async () => {
    const networkError = new Error("Network error");
    (global.fetch as jest.Mock).mockRejectedValueOnce(networkError);

    await expect(fetchWithTimeout("https://example.com",  {}, { timeoutMs: 5000, retryCount: 3 })).rejects.toThrow("Network error");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});