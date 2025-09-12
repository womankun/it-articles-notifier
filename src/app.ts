import dotenv from "dotenv";

import { TopicConfigsZenn } from "./services/zenn/topicConfig.js";
import { getZennArticles } from "./services/zenn/getArticles.ts";
import { notifyZenn } from "./services/zenn/notify.ts";
import { TopicConfigsQiita } from "./services/qiita/topicConfig.js";
import { getQiitaArticles } from "./services/qiita/getArticles.ts";
import { notifyQiita } from "./services/qiita/notify.ts";

dotenv.config();

const zenn = async () => {
  for (const topicConfig of TopicConfigsZenn) {
    console.log(`🔍 ${topicConfig.topic} の記事を取得中...`);
    const articles = await getZennArticles(topicConfig);
    for (const article of articles) {
      await notifyZenn(article, topicConfig);
    }
    await new Promise((r) => setTimeout(r, 1000)); // レート制限対策
  }
};

const qiita = async () => {
  for (const topicConfig of TopicConfigsQiita) {
    console.log(`🔍 ${topicConfig.topic} の記事を取得中...`);
    const articles = await getQiitaArticles(topicConfig);
    for (const article of articles) {
      await notifyQiita(article, topicConfig);
    }
    await new Promise((r) => setTimeout(r, 1000)); // レート制限対策
  }
};

await zenn();
await qiita();