import { sendDiscordMessage } from "../../infra/discord.ts";
import { TopicConfig } from "./topicConfig.ts";
import { ZennArticle } from "./types.ts";

export const notifyZenn = async (article: ZennArticle, config: TopicConfig) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL_ZENN || "";
  const message = formatMessage(article);
  await sendDiscordMessage(webhookUrl, config.watcherName, message);
};

const formatMessage = (article: ZennArticle): string => {
  return `${article.title}
👤 ${article.user.name} (@${article.user.id})
❤️ ${article.liked_count} 💬 ${article.comments_count}
📅 ${new Date(article.published_at).toLocaleString("ja-JP")}
🔗 https://zenn.dev${article.path}`;
}