'use client'

/**
 * LoginForm コンポーネント
 * 
 * ログインフォームの再利用可能なコンポーネント。
 * 将来的に app/(auth)/login/page.tsx から分離して使用可能。
 */

import { useState } from 'react'
import { authApi, setAuthToken } from '@/lib/api'

interface LoginFormProps {
  onSuccess?: (user: object) => void
  onError?: (error: string) => void
}

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const result = await authApi.login(email, password)

    if (result.error) {
      setError(result.error)
      onError?.(result.error)
    } else if (result.data) {
      setAuthToken(result.data.token)
      onSuccess?.(result.data.user)
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1.5">
          メールアドレス
        </label>
        <input
          id="login-email"
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
        <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 mb-1.5">
          パスワード
        </label>
        <input
          id="login-password"
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

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full py-3"
      >
        {isLoading ? 'ログイン中...' : 'ログイン'}
      </button>
    </form>
  )
}

