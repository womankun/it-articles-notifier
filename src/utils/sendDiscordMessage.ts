import { TopicConfig } from "../config/TopicConfig.ts";

type ArticleMessageFormatter<T> = (article: T) => string;

export const sendNotification = async <T>(
  article: T,
  topicConfig: TopicConfig,
  formatMessage: ArticleMessageFormatter<T>
) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL_ZENN || "";
  const message = formatMessage(article);

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
