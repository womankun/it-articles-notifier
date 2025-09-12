import { TopicConfig } from "../config/TopicConfig.js";
import { MissingArticlesError } from "../errors/MissingfArticlesError.ts";
import { ZennArticle } from "../types/ZennArticle.js";
import { fetchWithTimeout } from "../utils/fetchWithTimeout.js";
import { getYesterdayArticles } from "../utils/getYesterdayArticles.js";

export const getZennArticles = async (topicConfig: TopicConfig): Promise<ZennArticle[]> => {
  const res = await fetchWithTimeout(`https://zenn.dev/api/articles?topicname=${topicConfig.topic}&order=latest`);
  const text = await res.text();

  if (!res.body) throw new MissingArticlesError();

  const data = JSON.parse(text);
  const yesterdayArticles = getYesterdayArticles(data);

  return yesterdayArticles;
}