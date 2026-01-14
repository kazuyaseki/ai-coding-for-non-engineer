# 非エンジニアのためのAIコーディング入門

> AIと一緒にプログラミングを始めよう

本リポジトリは、書籍『**非エンジニアのためのAIコーディング入門**』の補助資料です。
本書の詳しい内容はこちらをご覧ください。

## 🛒 購入はこちら

- [note](https://note.com/ai_saborou/n/nf56e5ba7a62e)
- [Booth](https://ai-saborou.booth.pm/items/7794751)

## 📁 このリポジトリの内容

| ファイル | 内容 |
|---------|------|
| [prompts.md](./prompts.md) | 本書で使用するプロンプト集 |

## 🚀 ハンズオンを始める

### 第2-3章：Gemini Chatアプリを作ろう

本書のメインハンズオンでは、AIコーディングエディター「Antigravity」を使って、自分だけのGeminiチャットアプリを作成します。

1. [Antigravity](https://antigravity.google/)をインストール
2. [Node.js](https://nodejs.org/ja/)をインストール
3. [prompts.md](./prompts.md) から第3章のプロンプトをコピー

### 完成版サンプルを動かす

ハンズオンで作成するGemini Chatアプリの完成版を用意しています。

```bash
# 1. サンプルアプリのディレクトリに移動
cd sample-apps/gemini-chat

# 2. 依存パッケージをインストール
npm install

# 3. 環境変数ファイルを作成
#    .env ファイルを作成し、Gemini APIキーを設定してください
cp .env.example .env
echo "VITE_GEMINI_API_KEY=あなたのAPIキー" > .env

# 4. 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:5173` を開くと、チャットアプリが表示されます。

> **💡 APIキーの取得方法**
> 
> Gemini APIキーは [Google AI Studio](https://aistudio.google.com/api-keys) から無料で取得できます。詳しくは本書の第3章をご覧ください。

## 📝 プロンプトの使い方

[prompts.md](./prompts.md) には、本書で登場するプロンプトがまとめられています。

- ハンズオンを進める際にコピー＆ペーストしてお使いください
- 各プロンプトの詳しい解説は本書をご覧ください

各種プロンプトの右上のボタンをクリックするとコピーできます。

<img width="1590" height="730" alt="CleanShot 2025-12-21 at 18 45 23@2x" src="https://github.com/user-attachments/assets/2cc96270-8bdf-40e7-bc25-e3f385c7fd8a" />


## ⚠️ 注意事項

- このリポジトリは書籍の**補助資料**です
- プロンプトの意図や使い方の詳細は本書で解説しています
- AIモデルやツールの仕様変更により、動作が異なる場合があります

## 📬 お問い合わせ

- 誤植・修正の報告：Issue または Pull Request をお送りください

---

© 2025 <!-- TODO: 著者名 -->

