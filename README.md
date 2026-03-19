# BFH Arena

Brave Frontier Heroes（ブレヒロ）の Forge API を使ったバトルツール。

BFHアカウントでログインして使う。`CLIENT_ID` と `CLIENT_SECRET` は [BFH Developer Portal](https://bfh-developer-portal-front.vercel.app/) で取得する。

---

## 機能

### おれ vs おれ（テンプレパーティバトルシミュレータ）

ゲーム内のパーティテンプレートを「味方」「敵」にそれぞれ設定してバトルをシミュレートできる。

- ゲーム内パーティテンプレートを味方・敵に反映
- ユニット・スフィア・スキル行動順を自由に編集
- バトル実行 → 結果表示 + リプレイURLコピー

### バトルアリーナ

あらかじめ設定されたステージに挑戦する。

- ステージ一覧から選んで挑戦
- 自分のパーティテンプレートから編成を反映
- ステージごとのクリア記録をブラウザに保存（WIN/DRAW/LOSE・挑戦回数）
- バトル後のリプレイ確認

---

## セットアップ

\`\`\`bash
cp .env.example .env
# .env に CLIENT_ID と CLIENT_SECRET を記入

npm install
npm run generate:api   # Orval で BFH API クライアントを自動生成（必須）
npm run dev            # → http://localhost:3500
\`\`\`

### 環境変数

\`\`\`env
NEXT_PUBLIC_CLIENT_ID=your_client_id_here   # BFH Developer Portal で取得
CLIENT_SECRET=your_client_secret_here        # サーバーサイドのみ使用、Gitに含めないこと
\`\`\`

---

## 技術スタック

| 項目 | 内容 |
|---|---|
| Framework | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイル | Tailwind CSS 4 + shadcn/ui |
| API クライアント | Orval（OpenAPI → TypeScript + React Query hooks 自動生成） |
| 状態管理 | TanStack Query v5 |
| HTTP クライアント | Axios（カスタムインターセプターで認証自動付与） |

---

## プロジェクト構造

\`\`\`
app/
├── dashboard/        # ダッシュボード（機能の入り口）
├── simulator/        # おれ vs おれ（シミュレータ）
├── stages/           # バトルアリーナ：ステージ選択
├── battle/[id]/      # バトルアリーナ：編成・バトル実行
├── login/            # OAuth2 ログイン
├── admin/stages/     # ステージ設定エディタ（管理者用）
└── api/              # OAuth2 コールバック・メタデータプロキシ

src/
├── types/
│   └── battle.ts           # バトル・シミュレータ共通の型定義
├── components/
│   ├── battle/             # バトル・シミュレータ共通コンポーネント
│   │   ├── HeroDetailModal.tsx
│   │   ├── SphereDetailModal.tsx
│   │   ├── UnitMiniCard.tsx
│   │   ├── SphereMiniCard.tsx
│   │   ├── SelectedUnitRow.tsx
│   │   └── DeckCard.tsx    # パーティ一覧カード（ユニット+スフィアアイコン表示）
│   ├── layout/
│   │   └── BackButton.tsx
│   └── ui/
│       ├── difficulty-stars.tsx
│       └── （shadcn/ui コンポーネント）
├── lib/
│   ├── battle/
│   │   ├── cache.ts        # ヒーローメタ・スキルのグローバルキャッシュ
│   │   ├── constants.ts    # レアリティ・属性マップ等の定数
│   │   └── imageUrl.ts     # ユニット・スフィア画像URL生成
│   ├── clearRecords.ts     # ステージクリア記録（localStorage）
│   └── utils.ts
└── config/
    └── stages.ts           # バトルアリーナのステージ設定
\`\`\`

---

## ステージ設定の編集

\`/admin/stages\` にアクセスするとステージエディタが使える。編集後に「コードをコピー」して \`src/config/stages.ts\` の \`STAGES\` 配列に貼り付けてプッシュする。

---

## スクリプト

\`\`\`bash
npm run dev           # 開発サーバー（ポート3500）
npm run build         # プロダクションビルド（generate:api も実行される）
npm run generate:api  # BFH API クライアント自動生成（API 変更時に実行）
npm run lint          # ESLint
\`\`\`

---

## 認証フロー

1. ログインボタン → BFH OAuth2 認証ページへリダイレクト
2. 認証後 → \`/api/auth/callback\` でサーバーサイドがトークン交換（\`CLIENT_SECRET\` 使用）
3. アクセストークンを Cookie に保存 → ダッシュボードへリダイレクト
4. Orval 生成の React Query フックが Cookie からトークンを読んで API リクエストに自動付与

\`CLIENT_SECRET\` はサーバーサイドでのみ使用し、クライアントには露出しない。

---

## 注意事項

- \`src/api/generated/\` は \`.gitignore\` 対象なので、clone 後は \`npm run generate:api\` が必須
- \`CLIENT_SECRET\` は \`.env\` に記載し、絶対に Git にコミットしない
- アクセストークンは \`httpOnly: false\` の Cookie に保存（Orval フックがクライアントから読むため）
