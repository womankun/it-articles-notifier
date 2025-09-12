export interface QiitaArticle {
  id: string;
  title: string;
  body: string;
  tags: {
    name: string;
    versions: string[];
  }[];
  user: {
    id: string;
    name: string;
    profile_image_url: string;
  };
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  url: string;
}
