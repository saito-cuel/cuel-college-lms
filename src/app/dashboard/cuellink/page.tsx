import {
  Calendar,
  TrendingUp,
  MessageSquare,
  BookOpen,
  Star,
  Lightbulb,
  Target,
  Heart,
  Users,
  CheckCircle2,
  Clock,
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
          専門家による月次振り返りと今後のトピックをお届けします
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
            3月の学びを振り返り、4月の成長へ
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            2026年3月のCuelLinkでの投稿・イベントを専門家の視点で振り返り、メンバーへのフィードバックと4月のトピックをご紹介します。
          </p>
          <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                田
              </div>
              <div>
                <div className="font-semibold text-slate-800">田中 太郎</div>
                <div className="text-xs text-slate-400">UI/UXデザイン & プロダクト開発 専門家</div>
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

          {/* ─── セクション1: 3月の振り返り ─── */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">3月の投稿・イベント振り返り</h3>
            </div>

            {/* 人気の投稿 */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary-500" />
                注目の投稿
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PostCard
                  title="UXリサーチの実践的アプローチ"
                  author="山田 花子"
                  date="3月8日"
                  likes={42}
                  comments={15}
                  tags={['UX', 'リサーチ']}
                />
                <PostCard
                  title="マーケティングファネルの最適化戦略"
                  author="鈴木 一郎"
                  date="3月15日"
                  likes={38}
                  comments={22}
                  tags={['マーケティング', '戦略']}
                />
                <PostCard
                  title="JavaScriptのパフォーマンス改善テクニック"
                  author="佐藤 健"
                  date="3月21日"
                  likes={55}
                  comments={31}
                  tags={['JavaScript', '開発']}
                />
                <PostCard
                  title="デザインシステム構築のベストプラクティス"
                  author="高橋 美咲"
                  date="3月28日"
                  likes={47}
                  comments={18}
                  tags={['デザイン', 'システム']}
                />
              </div>
            </div>

            {/* イベント */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-500" />
                開催されたイベント
              </h4>
              <div className="space-y-3">
                <EventCard
                  title="UI/UXデザイン ハンズオンワークショップ"
                  date="3月5日（水）18:00〜20:00"
                  participants={24}
                  type="ワークショップ"
                />
                <EventCard
                  title="マーケティングトレンド 勉強会"
                  date="3月12日（水）19:00〜21:00"
                  participants={18}
                  type="勉強会"
                />
                <EventCard
                  title="フロントエンド開発 ライブコーディング"
                  date="3月19日（水）18:30〜20:30"
                  participants={31}
                  type="ライブコーディング"
                />
                <EventCard
                  title="キャリア相談会 〜 デザイナーへの道"
                  date="3月26日（水）18:00〜19:30"
                  participants={15}
                  type="相談会"
                />
              </div>
            </div>
          </section>

          {/* ─── セクション2: 専門家フィードバック ─── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">専門家からのフィードバック</h3>
            </div>

            <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  田
                </div>
                <div className="space-y-3 text-slate-700 leading-relaxed">
                  <p>
                    3月は非常に活発な月でした。特に<strong>「UXリサーチの実践的アプローチ」</strong>の投稿は、理論だけでなく具体的なユーザーインタビューの手法まで踏み込んでおり、実務に直結する内容として高く評価できます。
                  </p>
                  <p>
                    ライブコーディングセッションでは参加者のリアルタイムな質問が多く、特にReactのパフォーマンス最適化に関する議論が深まりました。<strong>仮想DOMの理解</strong>から<strong>メモ化の実践</strong>まで、段階的な学習ができていた点が印象的でした。
                  </p>
                  <p>
                    全体的に見て、メンバー同士の<strong>知識共有の文化</strong>が着実に醸成されています。投稿へのコメントが活発で、単なる情報発信ではなく双方向の学びが生まれています。この姿勢を4月も続けていきましょう。
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FeedbackPoint
                icon={<Star className="w-5 h-5 text-yellow-500" />}
                title="優れていた点"
                color="yellow"
                items={[
                  '実践的な事例の多用',
                  'コメントへの迅速な返答',
                  '異分野の視点の導入',
                ]}
              />
              <FeedbackPoint
                icon={<Lightbulb className="w-5 h-5 text-blue-500" />}
                title="さらなる改善点"
                color="blue"
                items={[
                  '数値・データの活用',
                  '図解・ビジュアルの追加',
                  '参考文献の明記',
                ]}
              />
              <FeedbackPoint
                icon={<Target className="w-5 h-5 text-green-500" />}
                title="4月への提案"
                color="green"
                items={[
                  'アウトプット量の向上',
                  '異なる業界からの学び',
                  '作業ログの共有',
                ]}
              />
            </div>
          </section>

          {/* ─── セクション3: 4月のトピック ─── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">4月のトピック</h3>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-6">
              <p className="text-slate-700 mb-6 leading-relaxed">
                4月は<strong>「成果を出すUI/UXデザイン」</strong>をテーマに、より実践的なスキルアップを目指します。各トピックは互いに連携しており、月末には総合的なプロジェクトに取り組む予定です。
              </p>
              <div className="space-y-3">
                <MonthlyTopic
                  week="第1週"
                  date="4月7日〜11日"
                  title="ユーザーリサーチとペルソナ設計"
                  description="定性・定量調査の手法を学び、効果的なペルソナを作成します"
                  status="current"
                />
                <MonthlyTopic
                  week="第2週"
                  date="4月14日〜18日"
                  title="情報アーキテクチャとワイヤーフレーム"
                  description="コンテンツ構造の設計から低忠実度プロトタイプの作成まで"
                  status="upcoming"
                />
                <MonthlyTopic
                  week="第3週"
                  date="4月21日〜25日"
                  title="ビジュアルデザインとデザインシステム"
                  description="カラー・タイポグラフィ・コンポーネントの一貫性ある設計"
                  status="upcoming"
                />
                <MonthlyTopic
                  week="第4週"
                  date="4月28日〜30日"
                  title="プロトタイピングとユーザーテスト"
                  description="高忠実度プロトタイプの制作とユーザビリティテストの実施"
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
                  title="デザインシンキング入門 ワークショップ"
                  date="4月9日（水）18:00〜20:00"
                  type="ワークショップ"
                  spotsLeft={8}
                />
                <UpcomingEventCard
                  title="グロースハック実践 勉強会"
                  date="4月16日（水）19:00〜21:00"
                  type="勉強会"
                  spotsLeft={12}
                />
                <UpcomingEventCard
                  title="Figmaで作るUIコンポーネント"
                  date="4月23日（水）18:30〜20:30"
                  type="ハンズオン"
                  spotsLeft={20}
                />
                <UpcomingEventCard
                  title="4月の成果発表会"
                  date="4月30日（水）18:00〜20:00"
                  type="発表会"
                  spotsLeft={null}
                />
              </div>
            </div>
          </section>

          {/* フッター */}
          <div className="border-t border-slate-100 pt-8">
            <div className="bg-slate-50 rounded-xl p-6 flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 mb-2">4月も一緒に学びましょう</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  3月の学びをしっかりと土台にして、4月はさらに実践的なスキルを磨いていきます。
                  疑問点や学んだことはどんどんCuelLinkに投稿して、みんなで知識を深めていきましょう！
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

function PostCard({
  title,
  author,
  date,
  likes,
  comments,
  tags,
}: {
  title: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  tags: string[];
}) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 hover:border-primary-200 hover:bg-primary-50/30 transition-colors">
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <h5 className="font-semibold text-slate-900 text-sm mb-2 leading-snug">{title}</h5>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{author} · {date}</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5" />
            {likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            {comments}
          </span>
        </div>
      </div>
    </div>
  );
}

function EventCard({
  title,
  date,
  participants,
  type,
}: {
  title: string;
  date: string;
  participants: number;
  type: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50/50">
      <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
        <Calendar className="w-5 h-5 text-slate-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
            {type}
          </span>
        </div>
        <h5 className="font-semibold text-slate-900 text-sm truncate">{title}</h5>
        <div className="text-xs text-slate-500 mt-0.5">{date}</div>
      </div>
      <div className="flex items-center gap-1 text-xs text-slate-500 flex-shrink-0">
        <Users className="w-3.5 h-3.5" />
        <span>{participants}名参加</span>
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
      {!isCurrent && (
        <CheckCircle2 className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
      )}
      {isCurrent && (
        <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
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
          <span className="text-xs text-slate-500">残り{spotsLeft}席</span>
        ) : (
          <span className="text-xs text-slate-400">全員参加</span>
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
