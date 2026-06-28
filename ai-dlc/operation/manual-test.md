# Manual Test

実データを登録する前に、以下は必ずダミーデータで確認する。

## Dummy Data

- 会議名: Test Meeting
- Zoom URL: https://zoom.us/j/00000000000
- ミーティングID: 000 0000 0000
- パスコード: test-pass
- メモ: Manual test only

## Test Cases

- [x] `app/index.html` または `open-zoom-launcher.command` でアプリを開ける
- [x] ダミー会議を登録できる
- [x] 登録後に一覧へ表示される
- [x] ページ再読み込み後も一覧に残る
- [x] `PW表示` でパスコードが表示される
- [x] `PW隠す` でパスコードが隠れる
- [x] `PWコピー` でパスコードをコピーできる
- [x] `編集` で登録内容を変更できる
- [x] `書き出し` でJSONを保存できる
- [x] `読み込み` でJSONから復元できる
- [x] `削除` で確認後に会議を削除できる
- [x] `全削除` で確認後に全データを削除できる
- [x] テスト後にダミーデータが残っていない

## Result

2026-06-28: User completed all manual test cases successfully.

## Release Note

このアプリはLocalStorageにZoom情報を保存する。実データを入れる前に、端末とブラウザプロファイルを自分だけが使える状態にしておく。
