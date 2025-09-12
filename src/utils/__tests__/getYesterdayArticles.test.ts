import { getYesterdayArticles } from "../getYesterdayArticles.ts";
import { testCases } from "./fixtures/getYesterdayArticlesTestCases.ts"; // ← パスは適宜調整

describe("getYesterdayArticles", () => {
  // Date.now() を固定（UTC 2025-09-10T00:00:00）
  const fixedNow = new Date("2025-09-10T00:00:00Z");
  beforeAll(() => {
    jest.useFakeTimers(); // モダンタイマーに切り替え
    jest.setSystemTime(new Date("2025-09-10T00:00:00Z")); // UTCで固定
  });

  afterAll(() => {
    jest.useRealTimers(); // 元に戻す
  });

  testCases.forEach(({ name, input, expected, throws }) => {
    test(name, () => {
      if (throws) {
        expect(() => getYesterdayArticles(input)).toThrow(throws);
      } else {
        const result = getYesterdayArticles(input);
        expect(result).toEqual(expected);
      }
    });
  });
});
