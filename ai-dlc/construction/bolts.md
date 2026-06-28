# Bolts

## Bolt 001: Minimum Useful Launcher

Goal:

Zoom会議を保存し、一覧から1クリックで開ける最小版を作る。

Scope:

- UOW-001: Save Meeting
- UOW-002: View Meetings
- UOW-003: Join Meeting
- UOW-005: Mask Passcode

Human Decisions Required:

- 保存方式: LocalStorage
- パスコードを保存するか: 保存するが、初期表示ではマスクする
- パスコードコピー機能の要否: Bolt 001では未実装。必要ならBolt 002で検討する

Validation:

- ダミーZoom URLで登録できる
- 再読み込み後も保存内容が残る
- 参加ボタンで新しいタブが開く
- パスコードが初期表示で隠れる

Implementation Notes:

- 削除はBolt 001に追加した。誤登録を取り消せないと最小版として使いにくいため。
- 編集はBolt 002へ残す。

## Bolt 002: Manage and Backup

Goal:

登録済み会議を安全に管理し、バックアップできるようにする。

Scope:

- UOW-004: Edit and Delete Meeting
- JSONエクスポート
- JSONインポート

Human Decisions Required:

- バックアップ機能を初回リリースに含めるか: Bolt 002で実装

Validation:

- 保存済み会議を編集できる
- パスコードをコピーできる
- JSONファイルを書き出せる
- 書き出した形式のJSONファイルを読み込める
- 読み込み時に既存データの置き換え確認が出る

Implementation Notes:

- JSON読み込みは現在の一覧を置き換える方式にした。重複マージの判断が不要で、バックアップ復元として分かりやすいため。
- 読み込み対象は `meetings` 配列を持つ形式、または会議配列そのものに対応する。
