# Units of Work

## UOW-001: Save Meeting

ユーザーは会議名、Zoom URL、ミーティングID、パスコードを保存できる。

Acceptance Criteria:

- 会議名を入力できる
- Zoom URLを入力できる
- ミーティングIDを入力できる
- パスコードを入力できる
- 保存後に一覧へ表示される

## UOW-002: View Meetings

ユーザーは保存済み会議を一覧で確認できる。

Acceptance Criteria:

- 保存済み会議がカードまたはリストで表示される
- 会議名が見やすい
- URL、ID、パスコードの扱いが分かる

## UOW-003: Join Meeting

ユーザーは保存済み会議を1クリックで開ける。

Acceptance Criteria:

- 参加ボタンを押すとZoom URLが開く
- URLが未入力の場合は参加ボタンを無効化する

## UOW-004: Edit and Delete Meeting

ユーザーは保存済み会議を編集・削除できる。

Acceptance Criteria:

- 登録済み情報を編集できる
- 削除前に確認できる
- 削除後に一覧から消える

## UOW-005: Mask Passcode

ユーザーはパスコードを通常時は隠し、必要な時だけ表示できる。

Acceptance Criteria:

- 初期表示ではパスコードがマスクされる
- 表示切り替えができる
- コピー操作が必要かどうかをInceptionで判断する

