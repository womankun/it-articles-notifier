import { ZennArticle } from "../types/ZennArticle.js";

export const getYesterdayArticles = (data: any): ZennArticle[] => {
  const now = new Date();
  const yesterday = new Date(now);
  now.setHours(0, 0, 0, 0); // 今日の0時
  yesterday.setDate(yesterday.getDate() - 1); // 昨日の0時
  
  const start = yesterday;
  const end = now;

  const yesterdayArticles = data.articles.filter((article: ZennArticle) => {
    const published = new Date(article.published_at);
    return published >= start && published < end;
  });

  return yesterdayArticles;
}