# Source Notes

## 2026-06-28

AWS Blog:

https://aws.amazon.com/jp/blogs/news/ai-driven-development-life-cycle/

確認した要点:

- AI-DLCは、AIを中心的な協力者としてソフトウェア開発ライフサイクルに組み込む方法論。
- 重要な考え方は「AIが実行し、人間が監督する」こと。
- AIは計画を作り、文脈理解のために質問し、人間の検証後に実装する。
- フェーズは Inception、Construction、Operation。
- Inceptionでは、AIがビジネス意図を要件、ストーリー、Units of Workへ変換し、Mob Elaborationで検証する。
- Constructionでは、AIがアーキテクチャ、ドメインモデル、コード、テストを提案し、Mob Constructionで技術判断を行う。
- Operationでは、蓄積された文脈を使ってデプロイメントや運用を管理する。
- AI-DLCでは、作業単位を Units of Work、短い集中作業サイクルを Bolts と呼ぶ。
