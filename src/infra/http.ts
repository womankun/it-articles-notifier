export const fetchWithTimeout = async (
  url: string,
  init: RequestInit = {},
  options?: { timeoutMs?: number; retryCount?: number }
): Promise<ReturnType<typeof fetch>> => {
  const timeoutMs = options?.timeoutMs ?? 10000;
  const retryCount = options?.retryCount ?? 3;

  for (let attempt = 0; attempt <= retryCount; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        ...init,
        signal: controller.signal 
      });
      clearTimeout(timeout);
      return res;
    } catch (err: any) {
      clearTimeout(timeout);

      const isTimeout = err.name === "AbortError";
      const isLastAttempt = attempt === retryCount;

      if (isTimeout && !isLastAttempt) {
        console.warn(`⚠️ タイムアウト。再試行中... (${attempt + 1}/${retryCount})`);
        continue;
      }
      if (isLastAttempt) {
        throw new Error("fetchWithTimeout: すべての再試行に失敗しました");
      }
      throw err;
    }
  }

  throw new Error("fetchWithTimeout: すべての再試行に失敗しました");
};
