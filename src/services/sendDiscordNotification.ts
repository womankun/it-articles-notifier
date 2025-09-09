import { TopicConfig } from "../config/TopicConfig.js";
import { ZennArticle } from "../types/ZennArticle.js";

export const sendDiscordNotification = async (article: ZennArticle, topicConfig: TopicConfig) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL || "";
  const message = `${article.emoji} ${article.title}
  👤 ${article.user.name} (@${article.user.username})
  ❤️ ${article.liked_count} 👍 ${article.bookmarked_count}
  📅 ${new Date(article.published_at).toLocaleString("ja-JP")}
  🔗 https://zenn.dev${article.path}`;

  const payload = { 
    content: `<@${process.env.DISCORD_USER_ID}>\n${message}`,
    username: `${topicConfig.watcherName} Watcher`,
  };
  
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("通知失敗:", res.statusText);
  } else {
    console.log("通知成功");
  }
};