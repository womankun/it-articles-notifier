# ARTICLE-WATCHER

Zenn・Qiitaなどの技術記事を定期取得し、Discordに通知するBotです。

## ディレクトリ構成

- `services/`：サービスごとのロジック（記事取得・通知・設定・型）
- `core/`：サービス横断の共通処理（ServiceHandler定義・登録）
- `infra/`：外部連携（Discord通知など）
- `utils/`：汎用ロジック（fetch, date, error）
- `__tests__/`：テストコードとフィクスチャ

## 環境変数

```env
DISCORD_WEBHOOK_URL_ZENN=...
DISCORD_WEBHOOK_URL_QIITA=...
DISCORD_USER_ID=...
QIITA_ACCESS_TOKEN=...
