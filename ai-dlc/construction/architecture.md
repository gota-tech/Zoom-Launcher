# Architecture

## Initial Architecture

- `app/index.html`: 画面構造
- `app/styles.css`: 見た目
- `app/script.js`: 会議データ管理、保存、画面操作

## Mob Construction Checkpoints

- 保存方式の選定
- パスコードの表示・非表示仕様
- Zoom URLを開く方式
- データのエクスポート・インポート要否
- テスト対象ブラウザ

## Data Model Draft

```json
{
  "id": "meeting-001",
  "title": "Weekly Team Meeting",
  "url": "https://zoom.us/j/00000000000",
  "meetingId": "000 0000 0000",
  "passcode": "example",
  "notes": "",
  "createdAt": "2026-06-28T00:00:00.000Z",
  "updatedAt": "2026-06-28T00:00:00.000Z"
}
```

## Storage Options

- LocalStorage: 実装が簡単。パスコード保護は弱い
- IndexedDB: 構造化データに強い。実装は少し増える
- 手動JSONファイル: バックアップしやすい。ブラウザだけでは自動保存しにくい

## Selected for Bolt 001

- 保存方式: LocalStorage
- パスコード: LocalStorageに保存し、画面上は初期状態でマスクする
- 参加方法: 保存済みZoom URLを新しいタブで開く
- 注意: LocalStorageは暗号化保存ではないため、同じブラウザプロファイルを読める人には見える可能性がある
