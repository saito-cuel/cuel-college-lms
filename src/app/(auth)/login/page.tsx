'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // TODO: 実際のログイン処理を実装
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, action: 'login' }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'ログインに失敗しました')
      }

      // ログイン成功時の処理
      console.log('Login successful:', data)
      // TODO: ダッシュボードへリダイレクト
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card">
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <div className="lg:hidden mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg">
            <span className="text-xl font-bold text-white">C</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">ログイン</h1>
        <p className="text-sm text-slate-600 mt-2">
          アカウントにサインインしてください
        </p>
      </div>

      {/* エラーメッセージ */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* ログインフォーム */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
            メールアドレス
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              パスワード
            </label>
            <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500">
              パスワードをお忘れですか？
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
            ログイン状態を保持する
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-3"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              ログイン中...
            </span>
          ) : (
            'ログイン'
          )}
        </button>
      </form>

      {/* 区切り線 */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-slate-500">または</span>
        </div>
      </div>

      {/* 新規登録リンク */}
      <p className="text-center text-sm text-slate-600">
        アカウントをお持ちでないですか？{' '}
        <Link href="/register" className="font-semibold text-primary-600 hover:text-primary-500">
          新規登録
        </Link>
      </p>
    </div>
  )
}

