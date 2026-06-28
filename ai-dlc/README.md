# AI-DLC Workspace

このフォルダは、AI-DLCに沿ってAI支援で開発するための作業記録と成果物を置く場所です。

参考: https://aws.amazon.com/jp/blogs/news/ai-driven-development-life-cycle/

## Core Model

- AIが計画を作成する
- AIが不足している文脈を質問する
- 人間が重要な判断と検証を行う
- 検証された内容をもとにAIが実装する
- 計画、要件、設計、変更、検証結果をリポジトリ内に残す

## Phase 1: Inception

目的、スコープ、ユーザー、要件、制約、リスク、成功条件を明確にします。AIがビジネス意図を要件、ストーリー、Units of Workへ変換し、人間がMob Elaborationとして検証します。

## Phase 2: Construction

設計、実装、レビュー、テスト、変更履歴を管理します。Inceptionで検証された文脈をもとに、AIが論理アーキテクチャ、ドメインモデル、コード、テストを提案し、人間がMob Constructionとして技術判断を行います。

## Phase 3: Operation

リリース後の使い方、運用、改善、障害対応、セキュリティ見直しを管理します。前フェーズで蓄積した文脈を使い、デプロイ、運用、改善を管理します。

## AI利用ルール

- AIの提案は人間が確認してから採用する
- Zoom ID、パスコード、個人情報はAIプロンプトに貼り付けない
- 仕様、判断、変更理由を文書に残す

## Working Terms

- `Unit of Work`: 実装可能な価値単位
- `Bolt`: 時間または日単位の短い集中作業サイクル
- `Mob Elaboration`: AIが作った要件や提案を人間が検証する活動
- `Mob Construction`: AIが作った設計や実装案を人間が技術的に検証する活動
