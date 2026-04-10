import {
  Calendar,
  TrendingUp,
  MessageSquare,
  BookOpen,
  Star,
  Lightbulb,
  Target,
  Users,
  CheckCircle2,
  Clock,
  FileText,
  Briefcase,
} from 'lucide-react';

export default function CuelLinkPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ページヘッダー */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-primary-200 text-sm font-medium">CuelLink</p>
            <h1 className="text-2xl font-bold">専門家フィードバック記事</h1>
          </div>
        </div>
        <p className="text-primary-100 text-sm">
          3月の学びを振り返り、4月の成長へつなげる月次レポートです
        </p>
      </div>

      {/* 記事本体 */}
      <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* 記事ヘッダー */}
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center gap-2 text-primary-600 text-sm font-semibold mb-3">
            <Star className="w-4 h-4 fill-primary-600" />
            <span>月次フィードバック記事</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-snug">
            3月の振り返りと専門家フィードバック：思考力と専門性を磨いた春
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            2026年3月に開催されたCuelCollegeの講座・ワークショップを振り返り、専門家の視点からフィードバックと4月のトピックをお届けします。
          </p>
          <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                齋
              </div>
              <div>
                <div className="font-semibold text-slate-800">齋藤</div>
                <div className="text-xs text-slate-400">CuelCollege 代表講師</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>2026年4月8日</span>
            </div>
          </div>
        </div>

        {/* 記事コンテンツ */}
        <div className="p-8 space-y-14">

          {/* ─── セクション1: 2月の振り返り（背景） ─── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">2月からの流れ：CuelLink始動</h3>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-slate-700 leading-relaxed space-y-3">
              <p>
                2月は新プラットフォーム「<strong>CuelLink β版</strong>」のリリースという大きな節目を迎えました。計5回のオンライン説明会を開催し、動画学習・イベント予約・コミュニティ交流が一体化した新しい学習環境への移行が始まりました。
              </p>
              <p>
                また、<strong>堂前晋平さん</strong>によるマネジメント特別授業（「フィードバックの時代は終わり？」）や、<strong>矢島志織さん</strong>による労務実務（就業規則 vs 労働契約）など、実務に直結する講義が好評を博しました。
              </p>
            </div>
          </section>

          {/* ─── セクション2: 3月の開催講座 ─── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">3月の開催講座・イベント</h3>
            </div>

            <div className="space-y-3">
              <CourseCard
                date="3月4日（水）12:00"
                title="所得税の新しい基礎知識"
                description="103万・178万の「壁」を図解で整理。話題の税制改正を実務目線でスッキリ解説。"
                tag="税務"
                tagColor="blue"
              />
              <CourseCard
                date="3月7日（土）11:00"
                title="ロジカルシンキング"
                description="上司への報告・説明で迷わない考え方のステップを習得。思考の整理術を体系的に学ぶ。"
                tag="ビジネス思考"
                tagColor="purple"
              />
              <CourseCard
                date="3月11日（水）20:00"
                title="freeeで学ぶ経理の日常業務"
                description="実際の画面を触りながら実務の流れを体験。クラウド会計ツールの使い方を習得。"
                tag="実務"
                tagColor="green"
              />
              <CourseCard
                date="3月14日（土）10:00"
                title="目標設定WS：ライフラインチャート"
                description="これまでの5年間を振り返り、自分の軸を再確認するキャリアワークショップ。"
                tag="キャリア"
                tagColor="orange"
              />
              <CourseCard
                date="3月14日（土）11:00"
                title="何から始めればいいのか：原価計算"
                description="材料費・人件費など基本から業種別ポイントまで、原価計算の全体像を整理。"
                tag="管理会計"
                tagColor="blue"
              />
              <CourseCard
                date="3月18日（水）20:00"
                title="キャリアの棚卸し＆強み発見WS"
                description="【6名限定】少人数で仲間と一緒に、自分だけの一生モノの強みを見つける濃密な時間。"
                tag="限定WS"
                tagColor="red"
              />
              <CourseCard
                date="3月21日（土）11:00"
                title="実務アップデート：動画学習のその先へ"
                description="初級コースの動画内容をプロ視点で深掘り解説。知識を実務に繋げるアップデート講座。"
                tag="実務"
                tagColor="green"
              />
            </div>
          </section>

          {/* ─── セクション3: 専門家フィードバック ─── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">専門家からのフィードバック</h3>
            </div>

            <div className="bg-primary-50 border border-primary-100 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  齋
                </div>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    3月は「思考力と専門性を磨く春のブラッシュアップ」をテーマに、税務・管理会計・ロジカルシンキング・キャリアと幅広いテーマで開催できました。
                  </p>
                  <p>
                    特に<strong>所得税の「壁」解説</strong>は、社会的に注目度の高いテーマということもあり、参加者から「ようやくスッキリ理解できた」という声を多くいただきました。図解でのアプローチが効果的でした。
                  </p>
                  <p>
                    <strong>キャリアの棚卸しWS（6名限定）</strong>は少人数制ならではの密度の高い対話が生まれており、参加者同士のつながりが深まった回でした。来月以降もこういった少人数形式を継続していきます。
                  </p>
                  <p>
                    一方で<strong>freee実務講座</strong>については、「もっと応用的な内容も聞きたい」という声があり、4月以降に続編を企画しています。実務ツールの活用は引き続き充実させていきます。
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FeedbackPoint
                icon={<Star className="w-5 h-5 text-yellow-500" />}
                title="良かった点"
                color="yellow"
                items={[
                  '税制改正の図解アプローチ',
                  '少人数WSの対話の深さ',
                  '実務ツールの体験学習',
                ]}
              />
              <FeedbackPoint
                icon={<Lightbulb className="w-5 h-5 text-blue-500" />}
                title="さらなる改善点"
                color="blue"
                items={[
                  'freee応用編の追加',
                  '復習資料の充実',
                  'アーカイブ活用の促進',
                ]}
              />
              <FeedbackPoint
                icon={<Target className="w-5 h-5 text-green-500" />}
                title="4月への提案"
                color="green"
                items={[
                  '決算実務の集中講座',
                  'キャリア相談の継続',
                  '少人数WSの定期化',
                ]}
              />
            </div>
          </section>

          {/* ─── セクション4: 4月のトピック ─── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">4月のトピック</h3>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-6">
              <p className="text-slate-700 mb-6 leading-relaxed">
                4月は新年度のスタートに合わせ、<strong>「決算と年度の節目を活かす実務力アップ」</strong>をテーマに展開します。年度末・年度始めに必須の知識を実務目線で深掘りします。
              </p>
              <div className="space-y-3">
                <MonthlyTopic
                  week="第1週"
                  date="4月7日〜11日"
                  title="年度末決算の実務ポイント"
                  description="期末処理・棚卸・減価償却など、決算に向けた実務の要点を整理します"
                  status="current"
                />
                <MonthlyTopic
                  week="第2週"
                  date="4月14日〜18日"
                  title="消費税の申告実務"
                  description="インボイス制度対応を含む消費税申告の実践的な手順と注意点"
                  status="upcoming"
                />
                <MonthlyTopic
                  week="第3週"
                  date="4月21日〜25日"
                  title="freee応用編：仕訳の自動化と効率化"
                  description="3月の続編。仕訳ルール設定や銀行連携など業務効率化の実践"
                  status="upcoming"
                />
                <MonthlyTopic
                  week="第4週"
                  date="4月28日〜30日"
                  title="キャリア戦略WS：新年度の目標設計"
                  description="「自分という会社」のB/Sを作るワークショップ。過去の経験を資産に変える自己分析"
                  status="upcoming"
                />
              </div>
            </div>

            {/* 4月のイベント予定 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-500" />
                4月のイベント予定
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <UpcomingEventCard
                  title="年度末決算 実務講座"
                  date="4月9日（水）20:00"
                  type="講座"
                  spotsLeft={null}
                />
                <UpcomingEventCard
                  title="消費税申告 徹底解説"
                  date="4月16日（水）20:00"
                  type="講座"
                  spotsLeft={null}
                />
                <UpcomingEventCard
                  title="freee応用編ハンズオン"
                  date="4月23日（水）20:00"
                  type="実習"
                  spotsLeft={20}
                />
                <UpcomingEventCard
                  title="キャリア戦略WS（少人数）"
                  date="4月26日（土）11:00"
                  type="限定WS"
                  spotsLeft={6}
                />
              </div>
            </div>
          </section>

          {/* フッター */}
          <div className="border-t border-slate-100 pt-8">
            <div className="bg-slate-50 rounded-xl p-6 flex items-start gap-4">
              <Briefcase className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 mb-2">4月も実務の現場で活かせる学びを</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  3月のブラッシュアップを経て、4月は新年度の実務に直結するテーマを集中的に扱います。
                  疑問点やご要望はCuelLinkのコメントで気軽にシェアしてください。皆さんの声が次の講座づくりに繋がります！
                </p>
              </div>
            </div>
          </div>

        </div>
      </article>
    </div>
  );
}

/* ─── Sub-components ─── */

function CourseCard({
  date,
  title,
  description,
  tag,
  tagColor,
}: {
  date: string;
  title: string;
  description: string;
  tag: string;
  tagColor: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}) {
  const tagStyles = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
    red: 'bg-red-100 text-red-700',
  }[tagColor];

  return (
    <div className="flex gap-4 p-4 border border-slate-200 rounded-xl hover:border-primary-200 hover:bg-primary-50/20 transition-colors">
      <div className="flex-shrink-0 w-28 text-xs text-slate-500 pt-0.5">{date}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h5 className="font-semibold text-slate-900 text-sm">{title}</h5>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${tagStyles}`}>
            {tag}
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function FeedbackPoint({
  icon,
  title,
  items,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: 'yellow' | 'blue' | 'green';
}) {
  const bg = {
    yellow: 'bg-yellow-50 border-yellow-100',
    blue: 'bg-blue-50 border-blue-100',
    green: 'bg-green-50 border-green-100',
  }[color];

  return (
    <div className={`${bg} border rounded-xl p-4`}>
      <div className="flex items-center gap-2 font-semibold text-slate-800 mb-3 text-sm">
        {icon}
        {title}
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-slate-600 flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MonthlyTopic({
  week,
  date,
  title,
  description,
  status,
}: {
  week: string;
  date: string;
  title: string;
  description: string;
  status: 'current' | 'upcoming';
}) {
  const isCurrent = status === 'current';
  return (
    <div
      className={`flex gap-4 p-4 rounded-xl border transition-colors ${
        isCurrent
          ? 'bg-white border-primary-300 shadow-sm'
          : 'bg-white/60 border-green-100'
      }`}
    >
      <div className="flex-shrink-0 text-center">
        <div
          className={`text-xs font-bold px-2 py-0.5 rounded-full mb-1 ${
            isCurrent
              ? 'bg-primary-600 text-white'
              : 'bg-slate-200 text-slate-600'
          }`}
        >
          {week}
        </div>
        <div className="text-xs text-slate-500 whitespace-nowrap">{date}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h5 className="font-semibold text-slate-900 text-sm">{title}</h5>
          {isCurrent && (
            <span className="flex items-center gap-1 text-xs text-primary-600 font-medium">
              <Clock className="w-3.5 h-3.5" />
              進行中
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
      {isCurrent ? (
        <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
      )}
    </div>
  );
}

function UpcomingEventCard({
  title,
  date,
  type,
  spotsLeft,
}: {
  title: string;
  date: string;
  type: string;
  spotsLeft: number | null;
}) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 hover:border-primary-200 hover:shadow-sm transition-all bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
          {type}
        </span>
        {spotsLeft !== null ? (
          <span className="text-xs text-red-500 font-medium">残り{spotsLeft}席</span>
        ) : (
          <span className="text-xs text-slate-400">全員参加可</span>
        )}
      </div>
      <h5 className="font-semibold text-slate-900 text-sm mb-1 leading-snug">{title}</h5>
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <Calendar className="w-3.5 h-3.5" />
        {date}
      </div>
    </div>
  );
}
