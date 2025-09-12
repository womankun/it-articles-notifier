export class MissingArticlesError extends Error {
  constructor() {
    super("articlesデータが存在しません");
    this.name = "MissingArticlesError";
  }
}