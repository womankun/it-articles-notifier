type TopicConfig = {
  topic: string;
  watcherName: string;
  // 他にも必要なら追加
};

type Article = any; // サービスごとに型は違うが、ここでは抽象化

export type ServiceHandler = {
  name: string;
  topicConfigs: TopicConfig[];
  getArticles: (config: TopicConfig) => Promise<Article[]>;
  notify: (article: Article, config: TopicConfig) => Promise<void>;
};
