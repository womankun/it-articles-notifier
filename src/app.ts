import dotenv from "dotenv";

import { TopicConfigs } from "./config/TopicConfig.js";
import { getZennArticles } from "./services/getZennArticles.js";
import { sendDiscordNotification } from "./services/sendDiscordNotification.js";

dotenv.config();

const runAllTopics = async () => {
  for (const topicConfig of TopicConfigs) {
    console.log(`🔍 ${topicConfig.topic} の記事を取得中...`);
    const articles = await getZennArticles(topicConfig);
    for (const article of articles) {
      await sendDiscordNotification(article, topicConfig);
    }
    await new Promise((r) => setTimeout(r, 1000)); // レート制限対策
  }
};

runAllTopics();