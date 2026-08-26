import Link from 'next/link';
import { Home, BookOpen, FileText, MessageCircle, Settings, Bell, User, TrendingUp, CheckSquare } from 'lucide-react';

export default function GlobalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* ロゴ */}
      <div className="flex items-center">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="text-lg font-bold text-slate-900 hidden sm:block">CuelCollege</span>
        </Link>
      </div>

      {/* ナビゲーション */}
      <nav className="flex items-center gap-1 sm:gap-2">
        <NavLink href="/dashboard" icon={<Home size={20} />} label="ホーム" />
        <NavLink href="/dashboard/learning" icon={<BookOpen size={20} />} label="学習" />
        <NavLink href="/dashboard/works" icon={<FileText size={20} />} label="ワーク" />
        <NavLink href="/dashboard/community" icon={<MessageCircle size={20} />} label="コミュニティ" />
        <NavLink href="/dashboard/cuellink" icon={<TrendingUp size={20} />} label="CuelLink" />
        <NavLink href="/dashboard/tasks" icon={<CheckSquare size={20} />} label="タスク" />
        <NavLink href="/dashboard/settings" icon={<Settings size={20} />} label="設定" />
      </nav>

      {/* ユーザーアクション */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <button className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600">
            <User size={16} />
          </div>
          <span className="text-sm font-medium text-slate-700 hidden md:block">ユーザー</span>
        </button>
      </div>
    </header>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="p-2 sm:px-3 sm:py-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors flex flex-col sm:flex-row items-center gap-1.5 group"
      title={label}
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-xs sm:text-sm font-medium hidden lg:block">{label}</span>
    </Link>
  );
}
