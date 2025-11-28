# CuelCollege LMS

CuelCollegeのオンライン学習管理システム（Learning Management System）です。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **フォント**: Noto Sans JP (Google Fonts)

## プロジェクト構造

```
cuel-college-lms/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # 認証関連ルートグループ
│   │   │   ├── login/         # ログインページ
│   │   │   └── layout.tsx     # 認証ページ共通レイアウト
│   │   ├── api/               # API Routes
│   │   │   └── auth/          # 認証API
│   │   ├── globals.css        # グローバルスタイル
│   │   ├── layout.tsx         # ルートレイアウト
│   │   └── page.tsx           # ホームページ
│   ├── components/            # 再利用可能なコンポーネント
│   │   └── auth/              # 認証関連コンポーネント
│   └── lib/                   # ユーティリティ関数
│       └── api.ts             # APIクライアント
├── public/                    # 静的ファイル
├── tailwind.config.ts         # Tailwind CSS設定
├── tsconfig.json              # TypeScript設定
└── package.json               # 依存関係
```

## セットアップ

### 前提条件

- Node.js 18.17以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン（または cd でプロジェクトディレクトリへ移動）
cd cuel-college-lms

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバーが起動したら、ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 開発

### 利用可能なスクリプト

- `npm run dev` - 開発サーバーを起動
- `npm run build` - プロダクションビルドを作成
- `npm run start` - プロダクションサーバーを起動
- `npm run lint` - ESLintでコードをチェック

### モックユーザー（開発用）

以下のアカウントでログインをテストできます：

| メールアドレス | パスワード | 役割 |
|--------------|-----------|------|
| admin@cuelcollege.com | password123 | 管理者 |
| student@cuelcollege.com | password123 | 学生 |
| instructor@cuelcollege.com | password123 | 講師 |

## 今後の開発予定

- [ ] ユーザー登録機能
- [ ] ダッシュボード
- [ ] コース一覧・詳細ページ
- [ ] 学習進捗管理
- [ ] クイズ・テスト機能
- [ ] ユーザープロフィール

## ライセンス

このプロジェクトはCuelCollege専用です。

