import { TopicConfig } from "../config/TopicConfig.js";
import { ZennArticle } from "../types/ZennArticle.js";
import { fetchWithTimeout } from "../utils/fetchWithTimeout.js";
import { getYesterdayArticles } from "../utils/getYesterdayArticles.js";

export const getZennArticles = async (topicConfig: TopicConfig): Promise<ZennArticle[]> => {
  const res = await fetchWithTimeout(`https://zenn.dev/api/articles?topicname=${topicConfig.topic}&order=latest`);
  const text = await res.text(); // ← streamではなく一括取得
  if (!res.body) throw new Error("レスポンスに body がありません");
  const data = JSON.parse(text);
  const yesterdayArticles = getYesterdayArticles(data);

  return yesterdayArticles;
}