import dotenv from "dotenv";

import { services } from "./core/serviceRegistry.ts";

dotenv.config();

const run = async () => {
  for (const service of services) {
    for (const topicConfig of service.topicConfigs) {
      console.log(`🔍${service.name}で ${topicConfig.topic} の記事を取得中...`);
      const articles = await service.getArticles(topicConfig);
      for (const article of articles) {
        await service.notify(article, topicConfig);
      }
      await new Promise((r) => setTimeout(r, 1000)); // レート制限対策
    }
  }
};

await run();
