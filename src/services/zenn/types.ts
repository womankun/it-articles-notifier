export type ZennArticle = {
  id: number;
  post_type: "Article";
  title: string;
  slug: string;
  comments_count: number;
  liked_count: number;
  bookmarked_count: number;
  body_letters_count: number;
  article_type: "tech" | "idea"; // Zennはこの2種類
  emoji: string;
  is_suspending_private: boolean;
  published_at: string; // ISO8601形式
  body_updated_at: string;
  source_repo_updated_at: string;
  pinned: boolean;
  path: string;
  principal_type: "User" | "Publication";
  user: {
    id: number;
    username: string;
    name: string;
    avatar_small_url: string;
  };
  publication: null; // 今回は null なので型は null | {...} にしてもOK
  publication_article_override: null;
};
