import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function ThumbnailPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 gap-6">

      {/* 操作ガイド */}
      <div className="flex items-center gap-4 text-sm text-slate-500">
        <Link href="/dashboard/cuellink" className="flex items-center gap-1 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4" /> 記事に戻る
        </Link>
        <span className="text-slate-300">|</span>
        <span>このページをスクリーンショットしてサムネとして使用してください</span>
      </div>

      {/* ─── インフォグラフィック本体 ─── */}
      {/* 横長サムネ（1200×630相当 → 表示は800×420） */}
      <div
        id="infographic-wide"
        style={{ width: 800, minHeight: 420, fontFamily: 'system-ui, sans-serif' }}
        className="bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* ヘッダー帯 */}
        <div className="flex items-center justify-between px-10 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-black text-sm">C</div>
            <span className="text-white font-bold text-base">CuelCollege</span>
          </div>
          <div className="text-right">
            <div className="text-primary-300 text-xs font-bold tracking-widest uppercase">Monthly Report</div>
            <div className="text-white font-bold text-sm">月間Cuel｜2026年3月号</div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="flex flex-1 gap-0">

          {/* 左カラム */}
          <div className="flex-1 px-10 py-6 flex flex-col gap-5">
            {/* キャッチコピー */}
            <div>
              <div className="text-primary-400 text-xs font-bold tracking-wide mb-1">今月のテーマ</div>
              <h2 className="text-white text-xl font-black leading-tight">
                思考力と専門性を<br />磨く春のブラッシュアップ
              </h2>
            </div>

            {/* 統計 */}
            <div className="grid grid-cols-3 gap-3">
              <StatBlock value="10" label="講座・イベント" color="primary" />
              <StatBlock value="2" label="スタンダード限定" color="yellow" />
              <StatBlock value="6" label="Q&Aハイライト" color="green" />
            </div>

            {/* 講座一覧 */}
            <div>
              <div className="text-slate-400 text-xs font-bold mb-2">3月の開催講座</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {[
                  { title: '所得税の新しい基礎知識', premium: false },
                  { title: 'ロジカルシンキング', premium: false },
                  { title: 'freeeで学ぶ経理の日常業務', premium: false },
                  { title: '目標設定WS：ライフラインチャート', premium: false },
                  { title: '原価計算のキホン', premium: false },
                  { title: 'キャリアの棚卸し＆強み発見WS', premium: false },
                  { title: '齋藤のなんでも相談会', premium: true },
                  { title: '実務アップデート', premium: false },
                  { title: '自分のB/SワークショップWS', premium: false },
                  { title: '減損会計＆資産除去債務', premium: true },
                ].map((c) => (
                  <div key={c.title} className="flex items-center gap-1.5 py-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.premium ? 'bg-yellow-400' : 'bg-primary-400'}`} />
                    <span className="text-slate-200 text-xs truncate">{c.title}</span>
                    {c.premium && <Lock className="w-2.5 h-2.5 text-yellow-400 flex-shrink-0" />}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" /><Lock className="w-2.5 h-2.5 text-yellow-400 inline" /> スタンダード限定</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary-400 inline-block" /> 全員参加可</span>
              </div>
            </div>
          </div>

          {/* 右カラム */}
          <div className="w-56 bg-white/5 px-6 py-6 flex flex-col gap-5 border-l border-white/10">
            {/* Q&Aハイライト */}
            <div>
              <div className="text-slate-400 text-xs font-bold mb-2">コミュニティ Q&A</div>
              <div className="space-y-1.5">
                {[
                  'AIリテラシー研修の提案',
                  '法人カードの選び方',
                  'MECEとロジカルシンキング',
                  'Google管理者権限の分割',
                  '一晩でCF作成の実体験',
                  '通信費 vs 研究開発費',
                ].map((q) => (
                  <div key={q} className="flex items-start gap-1.5">
                    <span className="text-primary-400 text-xs mt-0.5">Q</span>
                    <span className="text-slate-300 text-xs leading-snug">{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4月予告 */}
            <div className="border-t border-white/10 pt-4">
              <div className="text-slate-400 text-xs font-bold mb-2">4月の予告</div>
              <div className="space-y-1">
                {['年度末決算の実務', '消費税申告実務', 'freee応用編', 'キャリア戦略WS'].map((t, i) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="text-primary-500 font-bold w-3">{i + 1}</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-auto bg-primary-600 rounded-xl p-3 text-center">
              <div className="text-white text-xs font-bold leading-snug">
                スタンダードプランで<br />限定コンテンツを受講
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="px-10 py-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-slate-500 text-xs">CuelCollege © 2026</span>
          <span className="text-slate-500 text-xs">cuellink.com</span>
        </div>
      </div>

      {/* ─── 正方形サムネ（SNS用 1080×1080相当 → 表示500×500） ─── */}
      <div className="text-xs text-slate-400 font-medium self-start ml-0" style={{ marginLeft: 0 }}>
        正方形版（SNS・アイコン用）
      </div>
      <div
        id="infographic-square"
        style={{ width: 500, height: 500, fontFamily: 'system-ui, sans-serif' }}
        className="bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center text-white font-black text-xs">C</div>
            <span className="text-white font-bold text-sm">CuelCollege</span>
          </div>
          <span className="text-primary-300 text-xs font-bold">2026.3月号</span>
        </div>

        {/* 中央コンテンツ */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">
          <div className="text-primary-400 text-xs font-bold tracking-widest uppercase">月間Cuel</div>
          <h2 className="text-white text-2xl font-black leading-tight">
            思考力と専門性を<br />磨く春
          </h2>

          <div className="grid grid-cols-3 gap-3 w-full mt-2">
            <div className="bg-primary-600/30 border border-primary-500/30 rounded-xl py-3">
              <div className="text-white text-2xl font-black">10</div>
              <div className="text-primary-300 text-xs">講座</div>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl py-3">
              <div className="text-yellow-300 text-2xl font-black">2</div>
              <div className="text-yellow-400 text-xs">限定講座</div>
            </div>
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl py-3">
              <div className="text-green-300 text-2xl font-black">6</div>
              <div className="text-green-400 text-xs">Q&A</div>
            </div>
          </div>

          <div className="w-full bg-white/5 rounded-xl p-4 text-left space-y-1.5">
            <div className="text-slate-400 text-xs font-bold mb-2">今月のトピック</div>
            {['所得税改正・原価計算・ロジカルシンキング', 'freee実務・キャリアWS・減損会計', 'コミュニティQ&A：AI・法人カード・会計処理'].map((t) => (
              <div key={t} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-primary-400 mt-0.5">▸</span>{t}
              </div>
            ))}
          </div>
        </div>

        {/* フッター CTA */}
        <div className="bg-primary-700/50 border-t border-primary-600/30 px-8 py-3 text-center">
          <span className="text-white text-xs font-bold">スタンダードプランで限定コンテンツを受講 →</span>
        </div>
      </div>

    </div>
  );
}

function StatBlock({ value, label, color }: { value: string; label: string; color: 'primary' | 'yellow' | 'green' }) {
  const styles = {
    primary: { bg: 'bg-primary-600/30 border-primary-500/30', val: 'text-white', lbl: 'text-primary-300' },
    yellow:  { bg: 'bg-yellow-500/20 border-yellow-500/30',  val: 'text-yellow-300', lbl: 'text-yellow-400' },
    green:   { bg: 'bg-green-500/20  border-green-500/30',   val: 'text-green-300',  lbl: 'text-green-400' },
  }[color];

  return (
    <div className={`${styles.bg} border rounded-xl py-3 text-center`}>
      <div className={`${styles.val} text-2xl font-black`}>{value}</div>
      <div className={`${styles.lbl} text-xs leading-tight mt-0.5`}>{label}</div>
    </div>
  );
}
