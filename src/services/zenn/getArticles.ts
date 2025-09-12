import { TopicConfig } from "./topicConfig.ts";
import { MissingArticlesError } from "../../errors/MissingfArticlesError.ts";
import { ZennArticle } from "./types.ts";
import { getYesterdayRangeUTC } from "../../utils/dateRange.ts";
import { fetchWithTimeout } from "../../infra/http.ts";
import { filterArticlesByDateRange } from "../../utils/filterArticlesByDateRange.ts";

export const getZennArticles = async (topicConfig: TopicConfig): Promise<ZennArticle[]> => {
  const res = await fetchWithTimeout(`https://zenn.dev/api/articles?topicname=${topicConfig.topic}&order=latest`);
  const text = await res.text();

  if (!res.body) throw new MissingArticlesError();

  const data = JSON.parse(text);
  const yesterdayArticles = getYesterdayArticles(data);

  return yesterdayArticles;
}

const getYesterdayArticles = (data: { articles: ZennArticle[] }) => {
  if (!data || !data.articles) throw new MissingArticlesError();
  const { start, end } = getYesterdayRangeUTC();

  return filterArticlesByDateRange(data.articles, (a) => new Date(a.published_at), start, end);
};
