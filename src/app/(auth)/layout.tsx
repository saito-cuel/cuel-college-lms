export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* 左側：装飾パネル */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm">
              <span className="text-2xl font-bold">C</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-center">
            CuelCollege へようこそ
          </h2>
          <p className="text-lg text-white/80 text-center max-w-md">
            オンライン学習の新しいスタンダード。
            いつでも、どこでも、あなたのペースで学べます。
          </p>
        </div>
        {/* 装飾的な円 */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/10"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/10"></div>
      </div>

      {/* 右側：認証フォーム */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}

