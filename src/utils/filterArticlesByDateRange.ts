export const filterArticlesByDateRange = <T>(
  articles: T[],
  getDate: (article: T) => Date,
  start: Date,
  end: Date
): T[] => {
  return articles.filter((article) => {
    const published = getDate(article);
    return published >= start && published < end;
  });
};
