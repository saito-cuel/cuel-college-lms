import { NextRequest, NextResponse } from 'next/server'

// モックユーザーデータ（開発用）
const mockUsers = [
  {
    id: '1',
    email: 'admin@cuelcollege.com',
    password: 'password123',
    name: '管理者',
    role: 'admin',
  },
  {
    id: '2',
    email: 'student@cuelcollege.com',
    password: 'password123',
    name: '学生 太郎',
    role: 'student',
  },
  {
    id: '3',
    email: 'instructor@cuelcollege.com',
    password: 'password123',
    name: '講師 花子',
    role: 'instructor',
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, action } = body

    // ログイン処理
    if (action === 'login') {
      // バリデーション
      if (!email || !password) {
        return NextResponse.json(
          { error: 'メールアドレスとパスワードを入力してください' },
          { status: 400 }
        )
      }

      // ユーザー検索（モック）
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      )

      if (!user) {
        return NextResponse.json(
          { error: 'メールアドレスまたはパスワードが正しくありません' },
          { status: 401 }
        )
      }

      // 認証成功（実際の実装ではJWTトークンを生成）
      const { password: _, ...userWithoutPassword } = user
      return NextResponse.json({
        message: 'ログイン成功',
        user: userWithoutPassword,
        token: `mock-jwt-token-${user.id}-${Date.now()}`,
      })
    }

    // 新規登録処理（スタブ）
    if (action === 'register') {
      const { name } = body

      if (!email || !password || !name) {
        return NextResponse.json(
          { error: '必要な情報をすべて入力してください' },
          { status: 400 }
        )
      }

      // メールアドレスの重複チェック（モック）
      const existingUser = mockUsers.find((u) => u.email === email)
      if (existingUser) {
        return NextResponse.json(
          { error: 'このメールアドレスは既に登録されています' },
          { status: 409 }
        )
      }

      // 新規ユーザー作成（モック）
      const newUser = {
        id: String(mockUsers.length + 1),
        email,
        name,
        role: 'student' as const,
      }

      return NextResponse.json({
        message: 'アカウントが作成されました',
        user: newUser,
        token: `mock-jwt-token-${newUser.id}-${Date.now()}`,
      })
    }

    // ログアウト処理（スタブ）
    if (action === 'logout') {
      return NextResponse.json({ message: 'ログアウトしました' })
    }

    return NextResponse.json(
      { error: '無効なアクションです' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Auth API Error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // 現在のセッション確認（スタブ）
  return NextResponse.json({
    authenticated: false,
    user: null,
    message: 'セッションが存在しません',
  })
}

