import { MissingArticlesError } from "../../../errors/MissingfArticlesError.ts";

export const testCases = [
  {
    name: "昨日の記事",
    input: { articles: [{ published_at: "2025-09-09T12:00:00Z" }]},
    expected: [{ published_at: "2025-09-09T12:00:00Z" }],
  },
  {
    name: "今日の記事",
    input: { articles: [{ published_at: "2025-09-10T12:00:00Z" }]},
    expected: [],
  },
  {
    name: "一昨日の記事",
    input: { articles: [{ published_at: "2025-09-08T12:00:00Z" }]},
    expected: [],
  },
  {
    name: "昨日の0時ちょうど",
    input: { articles: [{ published_at: "2025-09-09T00:00:00Z" }]},
    expected: [{ published_at: "2025-09-09T00:00:00Z" }],
  },
  {
    name: "今日の0時ちょうど",
    input: { articles: [{ published_at: "2025-09-10T00:00:00Z" }]},
    expected: [],
  },
  {
    name: "空配列",
    input: { articles: []},
    expected: [],
  },
  {
    name: "published_atが不正な形式",
    input: { articles: [{ published_at: "invalid-date" }]},
    expected: [],
  },
  {
    name: "published_atがnull",
    input: { articles: [{ published_at: undefined }]},
    expected: [],
  },
  {
    name: "published_atがローカル時刻",
    input: { articles: [{ published_at: "2025-09-09T00:00:00" }] },
    expected: [],
  },
  {
    name: "data.articlesがundefined ",
    input: { articles: undefined },
    throws: MissingArticlesError,
  },
  {
    name: "dataがundefined ",
    input: undefined,
    throws: MissingArticlesError,
  },
  {
    name: "data.articlesに余計なフィールド",
    input: { articles: [{ 
      published_at: "2025-09-09T00:00:00Z",
      title: "TEST"
    }] 
    },
    expected: [{ 
      published_at: "2025-09-09T00:00:00Z",
      title: "TEST"
    }],
  },
  {
    name: "日にち混在",
    input: { articles: [
        { published_at: "2025-09-09T12:00:00Z" },
        { published_at: "2025-09-10T12:00:00Z" },
        { published_at: "2025-09-08T12:00:00Z" },
        { published_at: "2025-09-09T00:00:00Z" },
        { published_at: "2025-09-10T00:00:00Z" },
      ]
    },
    expected: [
      { published_at: "2025-09-09T12:00:00Z" },
      { published_at: "2025-09-09T00:00:00Z" },
    ],
  },
  {
    name: "published_atがタイムゾーン付き",
    input: { articles: [{ published_at: "2025-09-09T23:00:00+09:00" }] },
    expected: [{ published_at: "2025-09-09T23:00:00+09:00" }],
  },
  {
    name: "published_atががUnixタイムスタンプ",
    input: { articles: [{ published_at: "1631234567890" }] },
    expected: [],
  },
];
