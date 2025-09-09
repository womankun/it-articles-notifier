# Zenn Discord Watcher

Zennの特定トピック記事を取得し、Discordに通知するBotです。

## 機能
- Zenn APIから記事取得
- 昨日公開された記事のみ抽出
- Discord Webhookで通知
- タイムアウト＆再試行対応

## 環境変数
- `DISCORD_WEBHOOK_URL`
- `DISCORD_USER_ID`

## 実行方法
```bash
npm install
npm run start
