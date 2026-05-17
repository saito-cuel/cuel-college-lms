import {
  Calendar,
  MessageSquare,
  Star,
  Lightbulb,
  Target,
  Users,
  CheckCircle2,
  Clock,
  Lock,
  TrendingUp,
  ArrowRight,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function CuelLinkPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">

      {/* ─── 月次ナビゲーション ─── */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300">← 2月号</span>
        <span className="text-sm font-medium text-slate-500">2026年3月号</span>
        <Link href="/dashboard/cuellink/april" className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary-600 transition-colors">
          4月号 →
        </Link>
      </div>

      {/* ─── 月間Cuelヘッダー ─── */}
      <div className="bg-gradient-to-br from-slate-900 to-primary-900 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-2 text-primary-300 text-xs font-bold tracking-widest uppercase mb-3">
          <Zap className="w-4 h-4" />
          CuelLink 月間レポート
        </div>
        <h1 className="text-3xl font-bold mb-2">月間Cuel</h1>
        <p className="text-2xl font-light text-primary-200 mb-4">2026年3月号</p>
        <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
          税制・管理会計・思考術・キャリアと多彩なテーマで充実した3月でした。今月の学びをまるごと振り返ります。
        </p>
        <div className="flex flex-wrap gap-4 mt-6 text-sm">
          <StatBadge label="開催講座・イベント" value="10本" />
          <StatBadge label="スタンダード限定" value="2本" />
          <StatBadge label="Q&Aハイライト" value="6件" />
        </div>
      </div>

      {/* ─── 文章サマリー ─── */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8">
        <div className="flex items-center gap-2 text-primary-600 text-xs font-bold tracking-wide uppercase mb-4">
          <MessageSquare className="w-4 h-4" />
          今月のサマリー
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          「思考力と専門性を磨く春」—— 3月を振り返って
        </h2>
        <div className="space-y-3 text-slate-700 text-sm leading-loose">
          <p>
            2026年3月のCuelCollegeは、<strong>税務・管理会計・ロジカルシンキング・キャリア形成</strong>にわたる全10講座を開催しました。年度末という繁忙期にもかかわらず多くのCuelistが学びに参加し、コミュニティのQ&Aでも活発な議論が生まれた充実の一ヶ月でした。
          </p>
          <p>
            特に注目を集めたのは<strong>所得税の「壁」を図解で整理した講座</strong>です。103万・178万円の壁をめぐる税制改正を実務目線でスッキリ整理し、「ようやく全体像がつかめた」という声が多数届きました。また<strong>6名限定のキャリアの棚卸しWS</strong>では、少人数ならではの深い対話が生まれ、参加者同士のつながりも深まりました。
          </p>
          <p>
            スタンダード会員向けには<strong>「齋藤のなんでも相談会」</strong>（アーカイブなし・リアルタイム限定）と<strong>「減損会計＆資産除去債務のキホン」</strong>という2本の限定コンテンツを提供。現場で即使える高度な実務知識を、スタンダード会員だけの特別な時間でお届けしました。
          </p>
          <p>
            コミュニティQ&Aでは<strong>AIリテラシー・法人カード選び・ロジカルシンキングのMECE・Google Workspace管理者権限・AI使ったCF作成・AIツールの会計処理</strong>と、幅広いリアルな実務課題が投稿され、仲間の経験が自分の学びに直結する場面が何度も生まれました。
          </p>
          <p>
            4月は新年度を迎え、<strong>決算実務・消費税申告・freee応用・キャリア戦略</strong>をテーマに実践的な講座が続きます。3月の学びを土台に、一歩先の実務力を身につけていきましょう。
          </p>
        </div>
      </section>

      {/* ─── 3月の全講座・イベント ─── */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
          <Calendar className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-bold text-slate-900">3月の講座・イベント一覧</h2>
        </div>
        <div className="divide-y divide-slate-100">
          <CourseRow date="3月4日（水）12:00"  title="所得税の新しい基礎知識" plan="all" />
          <CourseRow date="3月7日（土）11:00"  title="ロジカルシンキング（上司への報告・説明で迷わない考え方）" plan="all" />
          <CourseRow date="3月11日（水）20:00" title="freeeで学ぶ経理の日常業務" plan="all" />
          <CourseRow date="3月14日（土）10:00" title="目標設定WS：ライフラインチャート" plan="all" />
          <CourseRow date="3月14日（土）11:00" title="何から始めればいいのか：原価計算" plan="all" />
          <CourseRow date="3月18日（水）20:00" title="キャリアの棚卸し＆強み発見WS【6名限定】" plan="all" highlight />
          <CourseRow date="3月20日（金）21:00" title="齋藤のなんでも相談会" plan="standard" noArchive />
          <CourseRow date="3月21日（土）11:00" title="実務アップデート：動画学習のその先へ" plan="all" />
          <CourseRow date="3月23日（月）"      title="「自分という会社」のB/Sを作るWS" plan="all" />
          <CourseRow date="3月28日（土）11:00" title="数字で未来を予測する：減損会計＆資産除去債務のキホン" plan="standard" />
        </div>
      </section>

      {/* ─── コミュニティ Q&A ハイライト ─── */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-bold text-slate-900">コミュニティ Q&amp;A ハイライト</h2>
          <span className="text-xs text-slate-400 ml-auto">今月も活発な議論が生まれました</span>
        </div>
        <div className="divide-y divide-slate-100">
          <QandACard
            date="3月1日"
            tag="質問・相談"
            question="社員のAIリテラシーに不安を感じており、社内AI研修の提案を考えています。業種が輸入卸のため活用方法が見つかりにくく、AI活用の経験やアドバイスをいただけますか？"
            expertComment="AIリテラシー向上は今や業種を問わない経営課題です。まず「議事録・作文系」から始めて成功体験を積む、というアプローチはとても現実的です。助成金を活用した研修制度もぜひ検討してみてください。"
          />
          <QandACard
            date="3月2日"
            tag="質問・相談"
            question="会社の経費精算で使う法人クレジットカードの選び方について、JCB以外の年会費無料カードやバーチャルカードで皆さんがお使いのものとメリット・デメリットを教えてください。"
            expertComment="9件もの回答が集まった人気の質問でした。法人カードは経費管理ツールとの連携がポイント。freee・マネーフォワードとの自動連携があるカードを選ぶと、日次の経理負担が大きく下がります。"
            comments={9}
          />
          <QandACard
            date="3月7日"
            tag="質問・相談"
            question='ロジカルシンキング授業で「伝えたい内容を全部伝えるべきだと思い込んでいる」が「伝わらない」原因とありましたが、これはMECE（もれなくダブりなく）と矛盾していませんか？'
            expertComment='鋭い疑問です！「MECE」は思考を整理する段階のフレーム、「全部伝えようとしない」は伝える段階の話です。整理はMECEに、伝え方は相手に合わせて取捨選択する──この2ステップを使い分けることがロジカルシンキングの核心です。'
            hearts={9}
            comments={3}
          />
          <QandACard
            date="3月11日"
            tag="質問・相談"
            question="会社でSQLサーバをGoogle Workspaceに移行予定です。現在の管理者（admin）が退職予定で、後任候補が営業系・バックオフィス系の2名。経営層の機密情報を営業系に見せたくないため、adminを2つに分けられないか社長から質問されました。"
            expertComment="Google Workspaceでは管理者ロールを細かく分割できます。「スーパー管理者」と「カスタム管理者ロール」を使い分けることで、アクセス権限を部門別に設定可能です。退職前に権限移行計画を立てることが重要で、今回のケースはセキュリティ観点からも正しい判断です。"
          />
          <QandACard
            date="3月21日"
            tag="実務シェア"
            question="取締役会の前日に突然CFを作ることになり、一晩で完成させました。AIに相談しながら作ったのですが、CF知識が乏しいためプロンプトがふわっとしてしまい、うまく活用できませんでした。Geminiよりもaiエージェントなら時短できたのかも？"
            expertComment="この経験はとても貴重です。AIは「知識がある人」をさらに速くするツールなので、CFの仕組みを学ぶと次回は全く違う結果になります。「どんな数字が必要か」を自分で判断できれば、AIへの指示も具体的になります。まさに学びの動機になった体験ですね！"
          />
          <QandACard
            date="3月24日"
            tag="質問・相談"
            question="WEB制作会社でAIツールを導入し「通信費」で処理してきました。ところが「将来このAIツールの仕組みを外部にプロダクトとして売りたい」という話が出てきました。この場合、通信費のままでいいのか、研究開発費として処理すべきか悩んでいます。"
            expertComment="非常に実務的で重要な論点です。現時点で「社内効率化のみ」なら通信費で問題ありません。ただし「外部販売を前提とした開発」フェーズに入った時点で、研究開発費への切り替えを検討すべきです。経営判断のタイミングと会計処理のタイミングを揃えることが実態に際した処理につながります。"
          />
        </div>
      </section>

      {/* ─── 専門家フィードバック ─── */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
          <Star className="w-5 h-5 text-yellow-500" />
          <h2 className="text-lg font-bold text-slate-900">今月の専門家コメント</h2>
        </div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">齋</div>
            <div className="space-y-3 text-slate-700 leading-relaxed text-sm">
              <p>
                3月は<strong>所得税改正・原価計算・freee実務・ロジカルシンキング・キャリア</strong>と守備範囲の広い月になりました。特にライフラインチャートと「自分のB/S」ワークショップは、数字を扱う経理担当者が自分のキャリアを俯瞰する新しい切り口として好評でした。
              </p>
              <p>
                スタンダード限定の<strong>「齋藤のなんでも相談会」</strong>は、リアルタイムで直接相談できる場として毎回盛り上がっています。アーカイブなし・その場限りの濃密な対話がここでしか得られない価値になっています。
              </p>
              <p>
                Q&Aでは<strong>AIリテラシー・法人カード・MECEの深掘り</strong>など、実務で今すぐ使える議論が広がりました。仲間の質問が自分の気づきになる——これがコミュニティ学習の醍醐味です。4月もどんどん投稿してください！
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <FeedbackChip icon={<CheckCircle2 className="w-4 h-4 text-green-500"/>} label="幅広いテーマの網羅" />
            <FeedbackChip icon={<CheckCircle2 className="w-4 h-4 text-green-500"/>} label="Q&Aコミュニティの活性化" />
            <FeedbackChip icon={<CheckCircle2 className="w-4 h-4 text-green-500"/>} label="スタンダード限定の充実" />
          </div>
        </div>
      </section>

      {/* ─── 4月予告 ─── */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
          <Target className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-bold text-slate-900">4月の講座・イベント予告</h2>
        </div>
        <div className="divide-y divide-slate-100">
          <CourseRow date="4月11日（土）10:00" title="自分アップデート会 Saturday Morning" plan="standard" noArchive />
          <CourseRow date="4月11日（土）11:00" title="簿記2級の「暗記」を卒業！60分で本質を掴む 税効果会計の実践講義" plan="standard-single" />
          <CourseRow date="4月11日（土）13:30" title="【経理上級コース】第6回 内部統制3点セット、業務改善" plan="seminar" />
          <CourseRow date="4月15日（水）20:00" title="自分アップデート会 Weekday Night" plan="standard" noArchive />
          <CourseRow date="4月16日（木）20:00" title="キャリアの棚卸し＆強み発見ワークショップ【2名限定・無料】" plan="all" highlight />
          <CourseRow date="4月18日（土）11:00" title="CuelLink投稿振り返り回 3月/4月" plan="standard-single" />
        </div>
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />全員参加可</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary-600 inline-block" />スタンダード限定</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />スタンダード無料・スポット購入可</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary-500 inline-block" />ゼミ授業</span>
          </div>
        </div>
      </section>

      {/* ─── スタンダードプランCTA ─── */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-primary-200 text-xs font-semibold tracking-wide mb-1">スタンダードプラン限定コンテンツ</p>
            <h3 className="text-xl font-bold mb-3">
              3月は2本の限定コンテンツをお届けしました
            </h3>
            <ul className="space-y-2 text-sm text-primary-100 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-300 flex-shrink-0" />
                齋藤のなんでも相談会（3/20）— リアルタイム直接相談、アーカイブなし
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-300 flex-shrink-0" />
                減損会計＆資産除去債務のキホン（3/28）— 上位実務の先取り
              </li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 bg-white text-primary-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-primary-50 transition-colors">
                スタンダードにアップグレード
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 border border-primary-400 text-white font-medium px-5 py-2.5 rounded-xl text-sm hover:bg-white/10 transition-colors">
                プランを比較する
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── スタンダード継続メッセージ ─── */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-start gap-4">
        <TrendingUp className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-slate-900 mb-1">スタンダード会員の皆さまへ</h4>
          <p className="text-slate-600 text-sm leading-relaxed">
            今月も限定コンテンツ・なんでも相談会へのご参加ありがとうございました。4月も実務直結の限定授業を企画中です。引き続き一緒に成長していきましょう！
          </p>
        </div>
      </div>

    </div>
  );
}

/* ─── Sub-components ─── */

function StatBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-primary-300">{label}</div>
    </div>
  );
}

type PlanType = 'all' | 'standard' | 'standard-single' | 'seminar';

function CourseRow({
  date, title, plan, noArchive, highlight,
}: {
  date: string; title: string; plan: PlanType;
  noArchive?: boolean; highlight?: boolean;
}) {
  const planBadge: Record<PlanType, JSX.Element> = {
    all:             <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">全員参加OK</span>,
    standard:        <span className="flex items-center gap-1 text-xs bg-primary-600 text-white px-2 py-0.5 rounded-full font-medium"><Lock className="w-3 h-3" />スタンダード限定</span>,
    'standard-single': <span className="flex items-center gap-1 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium"><Lock className="w-3 h-3" />スタンダード無料・スポット購入可</span>,
    seminar:         <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-0.5 rounded-full font-medium">ゼミ授業</span>,
  };

  return (
    <div className={`flex items-start gap-4 px-6 py-4 ${highlight ? 'bg-yellow-50' : ''}`}>
      <div className="text-xs text-slate-400 w-36 flex-shrink-0 pt-0.5 leading-relaxed">{date}</div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-slate-800">{title}</span>
          {highlight && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">人気</span>}
        </div>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {noArchive && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">アーカイブなし</span>}
        {planBadge[plan]}
      </div>
    </div>
  );
}

function QandACard({
  date, tag, question, expertComment, hearts, comments,
}: {
  date: string; tag: string; question: string;
  expertComment: string; hearts?: number; comments?: number;
}) {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 flex-shrink-0">
          <Users className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-slate-500 text-sm">Cuelistメンバー</span>
            <span className="text-xs text-slate-400">{date}</span>
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{tag}</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{question}</p>
          {(hearts || comments) && (
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
              {hearts && <span>❤️ {hearts}</span>}
              {comments && <span>💬 {comments}件のコメント</span>}
            </div>
          )}
        </div>
      </div>
      <div className="ml-12 bg-primary-50 border border-primary-100 rounded-xl p-4 flex gap-3">
        <div className="w-7 h-7 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">齋</div>
        <div>
          <div className="text-xs font-bold text-primary-700 mb-1">齋藤 より</div>
          <p className="text-xs text-slate-700 leading-relaxed">{expertComment}</p>
        </div>
      </div>
    </div>
  );
}

function FeedbackChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700">
      {icon}
      {label}
    </div>
  );
}

function UpcomingRow({ week, date, title, current }: { week: string; date: string; title: string; current?: boolean }) {
  return (
    <div className={`flex gap-4 p-3 rounded-xl ${current ? 'bg-primary-50 border border-primary-200' : 'bg-slate-50'}`}>
      <div className="flex-shrink-0">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${current ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
          {week}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-900">{title}</span>
          {current && <span className="text-xs text-primary-600 font-medium flex items-center gap-1"><Clock className="w-3 h-3"/>進行中</span>}
        </div>
        <div className="text-xs text-slate-400 mt-0.5">{date}</div>
      </div>
    </div>
  );
}
