import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CuelCollege LMS - オンライン学習管理システム',
  description: 'CuelCollegeのオンライン学習管理システム。効率的な学習体験を提供します。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
