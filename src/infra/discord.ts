export const sendDiscordMessage = async (
  webhookUrl: string,
  watcherName: string,
  message: string
) => {
  const payload = {
    content: `<@${process.env.DISCORD_USER_ID}>\n${message}`,
    username: `${watcherName} Watcher`,
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
