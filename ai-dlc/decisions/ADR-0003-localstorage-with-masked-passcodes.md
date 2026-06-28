# ADR-0003: LocalStorage With Masked Passcodes

## Status

Accepted for Bolt 001

## Context

Desktop上で自分だけが使う静的Webアプリとして、Zoom URL、ミーティングID、パスコードを保存したい。初期実装ではサーバーやクラウド同期を使わない。

## Decision

Bolt 001では、会議情報をブラウザのLocalStorageに保存する。パスコードは保存するが、画面上では初期状態でマスクし、ユーザー操作で表示できるようにする。

## Consequences

- サーバーなしで簡単に動く
- ページ再読み込み後も会議情報が残る
- パスコードは暗号化されないため、同じブラウザプロファイルを読める人には見える可能性がある
- より強い保護が必要になった場合は、Operationまたは次のBoltで保存方式を見直す
