import { ZennArticle } from "../types/ZennArticle.js";

export const getYesterdayArticles = (data: any): ZennArticle[] => {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0); // UTCの今日0時

  const yesterday = new Date(now);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1); // UTCの昨日0時

  const start = yesterday;
  const end = now;

  const yesterdayArticles = data.articles.filter((article: ZennArticle) => {
    const published = new Date(article.published_at);
    return published >= start && published < end;
  });

  return yesterdayArticles;
}