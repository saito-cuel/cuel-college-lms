/**
 * CuelCollege LMS - API クライアント
 * 
 * このモジュールは、バックエンドAPIとの通信を抽象化したユーティリティ関数を提供します。
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

/**
 * API リクエストのオプション型
 */
interface RequestOptions extends RequestInit {
  params?: Record<string, string>
}

/**
 * API レスポンスの基本型
 */
interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

/**
 * 認証トークンを取得
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

/**
 * 認証トークンを保存
 */
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('auth_token', token)
}

/**
 * 認証トークンを削除
 */
export function removeAuthToken(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('auth_token')
}

/**
 * 汎用 API クライアント
 */
async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { params, ...fetchOptions } = options

  // URLの構築
  let url = `${API_BASE_URL}${endpoint}`
  if (params) {
    const searchParams = new URLSearchParams(params)
    url += `?${searchParams.toString()}`
  }

  // デフォルトヘッダーの設定
  const headers = new Headers(fetchOptions.headers)
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  // 認証トークンの追加
  const token = getAuthToken()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        error: data.error || `HTTP error! status: ${response.status}`,
      }
    }

    return { data }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : '通信エラーが発生しました',
    }
  }
}

/**
 * 認証API
 */
export const authApi = {
  /**
   * ログイン
   */
  login: async (email: string, password: string) => {
    return apiClient<{ user: object; token: string }>('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ email, password, action: 'login' }),
    })
  },

  /**
   * 新規登録
   */
  register: async (email: string, password: string, name: string) => {
    return apiClient<{ user: object; token: string }>('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, action: 'register' }),
    })
  },

  /**
   * ログアウト
   */
  logout: async () => {
    removeAuthToken()
    return apiClient<{ message: string }>('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ action: 'logout' }),
    })
  },

  /**
   * セッション確認
   */
  getSession: async () => {
    return apiClient<{ authenticated: boolean; user: object | null }>('/api/auth', {
      method: 'GET',
    })
  },
}

/**
 * コースAPI（将来の実装用）
 */
export const coursesApi = {
  // TODO: コース関連のAPI関数を追加
}

/**
 * ユーザーAPI（将来の実装用）
 */
export const usersApi = {
  // TODO: ユーザー関連のAPI関数を追加
}

