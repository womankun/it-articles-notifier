import { sendDiscordMessage } from "../../infra/discord.ts";
import { TopicConfig } from "./topicConfig.ts";
import { QiitaArticle } from "./types.ts";

export const notifyQiita = async (article: QiitaArticle, config: TopicConfig) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL_QIITA || "";
  const message = formatMessage(article);
  await sendDiscordMessage(webhookUrl, config.watcherName, message);
};

const formatMessage = (article: QiitaArticle): string => {
  return `${article.title}
  👤 ${article.user.name} (@${article.user.id})
  ❤️ ${article.likes_count} 💬 ${article.comments_count}
  📅 ${new Date(article.created_at).toLocaleString("ja-JP")}
  🔗 ${article.url}`;
}