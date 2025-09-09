import { TopicConfig } from "../config/TopicConfig.js";
import { ZennArticle } from "../types/ZennArticle.js";
import { fetchWithTimeout } from "../utils/fetchWithTimeout.js";
import { getYesterdayArticles } from "../utils/getYesterdayArticles.js";

export const getZennArticles = async (topicConfig: TopicConfig): Promise<ZennArticle[]> => {
  const res = await fetchWithTimeout(`https://zenn.dev/api/articles?topicname=${topicConfig.topic}`);
  
  if (!res.body) throw new Error("レスポンスに body がありません");
  
  const reader = (res.body as unknown as ReadableStream<Uint8Array>).getReader(); // ← 型アサーション

  let raw = "";
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    raw += decoder.decode(value);
  }

  const data = JSON.parse(raw);
  const yesterdayArticles = getYesterdayArticles(data);

  return yesterdayArticles;
}