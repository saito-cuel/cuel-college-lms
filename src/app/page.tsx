import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-2xl">
        {/* ロゴ・ヘッダー */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg">
            <span className="text-3xl font-bold text-white">C</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            CuelCollege
            <span className="block text-primary-600">Learning Management System</span>
          </h1>
          <p className="text-lg text-slate-600">
            効率的なオンライン学習体験を提供する次世代LMS
          </p>
        </div>

        {/* CTAボタン */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" className="btn-primary text-base px-8 py-3">
            ログイン
          </Link>
          <Link href="/login" className="btn-secondary text-base px-8 py-3">
            新規登録
          </Link>
        </div>

        {/* 特徴 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
          <div className="text-center">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="font-semibold text-slate-900">豊富なコース</h3>
            <p className="text-sm text-slate-600">多様な学習コンテンツ</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-slate-900">進捗管理</h3>
            <p className="text-sm text-slate-600">学習状況を可視化</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-slate-900">目標設定</h3>
            <p className="text-sm text-slate-600">効率的な学習計画</p>
          </div>
        </div>
      </div>
    </main>
  )
}

