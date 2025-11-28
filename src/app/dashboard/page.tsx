import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle2, MessageSquare, FileText } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* 左サイド: 次のアクション (1/4) */}
      <div className="lg:col-span-1 space-y-6">
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-600" />
            次のアクション
          </h2>
          <div className="space-y-4">
            {/* 未完了タスク */}
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                <div className="text-xs text-red-600 font-semibold mb-1">提出期限: 本日 23:59</div>
                <h3 className="text-sm font-medium text-slate-900 mb-2">Webデザイン基礎 課題1</h3>
                <Link href="/dashboard/works" className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
                  提出する <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-500 font-semibold mb-1">未読フィードバック</div>
                <h3 className="text-sm font-medium text-slate-900 mb-2">マーケティング概論 レポート</h3>
                <Link href="/dashboard/works" className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                  確認する <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-500 font-semibold mb-1">未完了の事前学習</div>
                <h3 className="text-sm font-medium text-slate-900 mb-2">UIデザインの原則 動画視聴</h3>
                <Link href="/dashboard/learning" className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                  学習を再開 <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 中央: ワークショップ概要 (2/4 -> lg:col-span-2) */}
      <div className="lg:col-span-2 space-y-6">
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">参加中のワークショップ</h2>
            <span className="bg-primary-50 text-primary-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">進行中</span>
          </div>
          
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">UI/UXデザイン実践マスターコース</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-4">
                <div>
                  <span className="block text-slate-400 text-xs">次回開催日</span>
                  2024年12月01日 (土) 14:00
                </div>
                <div>
                  <span className="block text-slate-400 text-xs">講師</span>
                  田中 太郎
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">全体の進捗</span>
                  <span className="font-bold text-primary-600">50%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    完了したモジュール
                  </h4>
                  <p className="text-2xl font-bold text-slate-700">3/6</p>
               </div>
               <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    提出済み課題
                  </h4>
                  <p className="text-2xl font-bold text-slate-700">2/4</p>
               </div>
            </div>
          </div>
        </section>
      </div>

      {/* 右サイド: クラスチャット (1/4) */}
      <div className="lg:col-span-1 space-y-6">
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary-600" />
              クラスチャット
            </h2>
          </div>

          <div className="flex-1 space-y-4 mb-4">
            {/* チャット投稿サンプル */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0"></div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-slate-900">佐藤 花子</span>
                  <span className="text-xs text-slate-400">10分前</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">
                  次回の課題について質問です。フォーマットは自由でしょうか？
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0"></div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-slate-900">田中 講師</span>
                  <span className="text-xs text-slate-400">1時間前</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">
                  みなさん、事前学習の動画は確認しましたか？重要なポイントが含まれています。
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0"></div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-slate-900">鈴木 一郎</span>
                  <span className="text-xs text-slate-400">3時間前</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">
                  ありがとうございます！確認してみます。
                </p>
              </div>
            </div>
          </div>

          <Link 
            href="/dashboard/community" 
            className="w-full btn-secondary text-sm py-2 mt-auto"
          >
            もっと見る
          </Link>
        </section>
      </div>
    </div>
  );
}

