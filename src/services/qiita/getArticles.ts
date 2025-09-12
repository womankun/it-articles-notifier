import { TopicConfig } from "./topicConfig.ts";
import { QiitaArticle } from "./types.ts";
import { filterArticlesByDateRange } from "../../utils/filterArticlesByDateRange.ts";
import { getYesterdayRangeJST } from "../../utils/dateRange.ts";
import { MissingArticlesError } from "../../errors/MissingfArticlesError.ts";
import { fetchWithTimeout } from "../../infra/http.ts";

export const getQiitaArticles = async (topicConfig: TopicConfig): Promise<QiitaArticle[]>  => {
  const res = await fetchWithTimeout(`https://qiita.com/api/v2/items?query=tag:${topicConfig.topic}&per_page=50`, {
      headers: {
        Authorization: `Bearer ${process.env.QIITA_ACCESS_TOKEN}`,
      },
    },
  );
  const data = await res.json();
  const yesterdayArticles = getYesterdayArticles(data);
  return yesterdayArticles;
}

const getYesterdayArticles = (data: QiitaArticle[]) => {
  if (!data) throw new MissingArticlesError();
  const { start, end } = getYesterdayRangeJST();

  return filterArticlesByDateRange(data, (a) => new Date(a.created_at), start, end);
};
