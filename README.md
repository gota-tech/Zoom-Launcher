# Zoom One-Click Meeting Launcher

よく参加するZoom会議のID、パスコード、URLを保存し、ワンクリックで参加できるローカルWebアプリを作るプロジェクトです。

## 技術スタック

- HTML
- CSS
- JavaScript
- 初期方針: サーバーなしの静的Webアプリ

## 起動方法

`app/index.html` をブラウザで開きます。ローカル静的ファイルとして動くため、開発サーバーは不要です。

macOSでは `open-zoom-launcher.command` をダブルクリックして開くこともできます。

## Bolt 001で実装済み

- 会議名、Zoom URL、ミーティングID、パスコード、メモの登録
- LocalStorageへの保存
- 保存済み会議の一覧表示
- 参加ボタンからZoom URLを新しいタブで開く
- パスコードの初期マスクと表示切替
- 保存済み会議の削除

## Bolt 002で実装済み

- 保存済み会議の編集
- パスコードのコピー
- JSONファイルへの書き出し
- JSONファイルからの読み込み
- 保存済み会議の全削除

## Operationで追加済み

- macOS用の起動ファイル
- 手動テスト手順
- 書き出しJSONをGit管理から外す `.gitignore`

## AI-DLC

このプロジェクトは `ai-dlc/` 配下で、Inception、Construction、Operation の3フェーズに分けて進めます。

- `ai-dlc/inception/`: 目的、利用者、要件、制約、リスクを固める
- `ai-dlc/construction/`: 設計、実装計画、検証計画、変更ログを管理する
- `ai-dlc/operation/`: リリース、運用、改善、インシデント対応を管理する

## 保存方式と注意点

- 会議情報はブラウザのLocalStorageに保存します
- パスコードは画面上では初期状態でマスクされます
- LocalStorageは暗号化保存ではないため、同じブラウザプロファイルを読める人には見える可能性があります
- JSON書き出しファイルにはZoom URL、ミーティングID、パスコードが含まれるため、共有しないでください
- 書き出しJSONは `zoom-meetings-*.json` として `.gitignore` に登録済みです

## リリース前確認

[manual-test.md](./ai-dlc/operation/manual-test.md) の手順をダミーデータで確認してから、実際のZoom情報を登録します。
