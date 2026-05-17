import {
  Calendar,
  MessageSquare,
  Star,
  Target,
  Users,
  CheckCircle2,
  Lock,
  TrendingUp,
  ArrowRight,
  Zap,
  Shield,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

export default function AprilCuelPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">

      {/* ─── 月間Cuelヘッダー ─── */}
      <div className="bg-gradient-to-br from-slate-900 to-primary-900 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-2 text-primary-300 text-xs font-bold tracking-widest uppercase mb-3">
          <Zap className="w-4 h-4" />
          CuelLink 月間レポート
        </div>
        <h1 className="text-3xl font-bold mb-2">月間Cuel</h1>
        <p className="text-2xl font-light text-primary-200 mb-4">2026年4月号</p>
        <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
          新年度スタートの4月は、ゼミが本格稼働し「自分アップデート会」が新登場。AIリスク・税効果会計・キャリア開発と盛りだくさんの全14本。
        </p>
        <div className="flex flex-wrap gap-4 mt-6 text-sm">
          <StatBadge label="開催講座・イベント" value="14本" />
          <StatBadge label="スタンダード限定" value="7本" />
          <StatBadge label="ゼミ授業" value="6本" />
          <StatBadge label="Q&Aハイライト" value="5件" />
        </div>
      </div>

      {/* ─── 月次ナビゲーション ─── */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard/cuellink" className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> 3月号
        </Link>
        <span className="text-sm font-medium text-slate-500">2026年4月号</span>
        <span className="text-sm text-slate-300">5月号 →</span>
      </div>

      {/* ─── 文章サマリー ─── */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8">
        <div className="flex items-center gap-2 text-primary-600 text-xs font-bold tracking-wide uppercase mb-4">
          <MessageSquare className="w-4 h-4" />
          今月のサマリー
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          「新年度の実力づくり」—— 4月を振り返って
        </h2>
        <div className="space-y-3 text-slate-700 text-sm leading-loose">
          <p>
            2026年4月のCuelCollegeは、<strong>ゼミ授業の本格稼働・新コンテンツ「自分アップデート会」の開始・AI情報リスク・税効果会計・キャリア開発</strong>と、新年度に相応しい全14本を開催しました。初の試みも多く、コミュニティ全体がひとまわり成長を感じられた一ヶ月でした。
          </p>
          <p>
            最も注目を集めたのは<strong>「その情報、AIに入れても大丈夫？」</strong>。日常業務でAIを使う機会が増える中、何を入力してよくて何がNGなのかを整理した実践的な講座です。ゲスト講師・末廣修平氏(Dooox)を迎え、情報セキュリティの観点から具体的なガイドラインを学びました。
          </p>
          <p>
            <strong>税効果会計の実践講義</strong>は、簿記2級の「暗記」から脱却し60分で本質を掴む構成が好評。繰延税金資産・負債の考え方を実務目線で整理し、「決算で迷わなくなった」という感想が寄せられました。
          </p>
          <p>
            新設の<strong>「自分アップデート会」</strong>（Saturday Morning／Weekday Night）は、月2回・スタンダード会員限定でアーカイブなしの参加型イベント。学びを振り返り、次のアクションを言語化する場として、じわじわと口コミが広がっています。
          </p>
          <p>
            <strong>ゼミ</strong>では即戦力経理ゼミ・経理上級コースが合わせて6回開催され、実践的なカリキュラムが着実に進んでいます。コミュニティQ&Aでも、ゼミ生や一般会員から多彩な実務相談が寄せられた活発な月でした。
          </p>
          <p>
            5月は<strong>実務直結の税務・AI活用・経営財務</strong>テーマが続きます。4月の学びを積み重ねながら、さらに一段上の実力を目指していきましょう。
          </p>
        </div>
      </section>

      {/* ─── 4月の全講座・イベント ─── */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
          <Calendar className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-bold text-slate-900">4月の講座・イベント一覧</h2>
        </div>
        <div className="divide-y divide-slate-100">
          <CourseRow date="4月4日（土）11:00"  title="その情報、AIに入れても大丈夫？" plan="standard" />
          <CourseRow date="4月4日（土）11:00"  title="即戦力経理ゼミ 第13回" plan="seminar" />
          <CourseRow date="4月4日（土）13:30"  title="経理上級コース 第5回 業務プロセスの可視化と改善" plan="seminar" />
          <CourseRow date="4月9日（木）20:00"  title="齋藤のなんでも相談会" plan="standard" noArchive />
          <CourseRow date="4月11日（土）10:00" title="自分アップデート会 Saturday Morning" plan="standard" noArchive />
          <CourseRow date="4月11日（土）11:00" title="簿記2級の「暗記」を卒業！60分で本質を掴む 税効果会計の実践講義" plan="standard" />
          <CourseRow date="4月11日（土）13:30" title="経理上級コース 第6回 内部統制3点セット・業務改善" plan="seminar" />
          <CourseRow date="4月15日（水）20:00" title="自分アップデート会 Weekday Night" plan="standard" noArchive />
          <CourseRow date="4月16日（木）20:00" title="キャリアの棚卸し＆強み発見ワークショップ【2名限定】" plan="all" highlight />
          <CourseRow date="4月18日（土）11:00" title="CuelLink投稿振り返り回 3月/4月" plan="standard" />
          <CourseRow date="4月18日（土）11:00" title="即戦力経理ゼミ 第2回" plan="seminar" />
          <CourseRow date="4月18日（土）13:30" title="経理上級コース 第7回 実績分析・予実管理" plan="seminar" />
          <CourseRow date="4月21日（火）21:00" title="「自分という会社」の決算書をつくる" plan="standard" noArchive />
          <CourseRow date="4月25日（土）11:00" title="即戦力経理ゼミ 第3回" plan="seminar" />
        </div>
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" />全員参加OK</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary-600 inline-block" />スタンダード限定</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />スタンダード無料・スポット購入可</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary-500 inline-block" />ゼミ授業</span>
          </div>
        </div>
      </section>

      {/* ─── コミュニティ Q&A ハイライト ─── */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-bold text-slate-900">コミュニティ Q&amp;A ハイライト</h2>
          <span className="text-xs text-slate-400 ml-auto">今月も実務に直結した議論が広がりました</span>
        </div>
        <div className="divide-y divide-slate-100">
          <QandACard
            date="4月初旬"
            tag="質問・相談"
            question="業務でChatGPTやGeminiを使う機会が増えてきました。顧客情報や社内の数字が含まれるデータをAIに貼り付けてよいのか判断に迷います。どう線引きすればよいでしょうか？"
            expertComment="「その情報、AIに入れても大丈夫？」講座でもお伝えしましたが、まず『その情報が外部に出たら困るか』を自問することが基本です。個人情報・取引先情報・未公開の財務数値はNG。業務効率化ツールとしてのAI利用ガイドラインを会社として整備することをお勧めします。"
          />
          <QandACard
            date="4月中旬"
            tag="質問・相談"
            question="決算で繰延税金資産を計上するかどうかで上司と意見が分かれました。将来の収益予測が不確かな場合、回収可能性はどう判断すればよいですか？"
            expertComment="繰延税金資産の計上可否は、将来の課税所得の見積もりが核心です。会社の業績トレンド・事業計画の確実性・タックスプランニングの余地の3点を整理してください。保守的に見積もる姿勢が監査対応としても安全で、過年度の実績と比較しながら判断するのがポイントです。"
            hearts={7}
            comments={4}
          />
          <QandACard
            date="4月中旬"
            tag="実務シェア"
            question="自分アップデート会に参加してみました。『次の一週間でやること』を宣言する場があり、ゆるいけど程よい緊張感があって良かったです。こういうアウトプットの場って大事ですね。"
            expertComment="ありがとうございます！自分アップデート会はまさにそのための場です。インプットを学びで終わらせず、行動に落とし込むことが実力になります。宣言したことを来週も教えてください！"
            hearts={12}
          />
          <QandACard
            date="4月下旬"
            tag="質問・相談"
            question="freeeで固定資産の除却処理をしようとしたのですが、取得価額・減価償却累計額・帳簿価額をどのように仕訳すればよいかわからなくなりました。除却損が出る場合の処理も教えてください。"
            expertComment="固定資産除却の仕訳は（借）減価償却累計額・固定資産除却損 ／（貸）固定資産 の形が基本です。freeeでは「資産の廃棄・売却」メニューから操作すると自動で仕訳が生成されます。除却損は営業外費用か特別損失で処理するか、金額と性質で判断してください。"
            comments={3}
          />
          <QandACard
            date="4月下旬"
            tag="質問・相談"
            question="「自分という会社」の決算書をつくるWSで、自分の資産・負債を棚卸しすると、意外と純資産が少ないことがわかりました。スキルや知識は資産に入れてよいのでしょうか？"
            expertComment="会計上の資産には入りませんが、あなたの人的資本として間違いなく「本当の純資産」です。このWSのポイントはまさにそこで、財務B/Sに映らない人的・関係的資本も可視化して、自分への投資判断に活かすことが目的です。数字にならないものほど意識的に育てる必要があります。"
            hearts={10}
            comments={5}
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
                4月は<strong>「数と自分と組織」</strong>という三つの軸が重なった月だったと感じています。税効果会計・固定資産・予実管理といった実務のナレッジ、AIリスクという組織的判断力、そして「自分という会社」のB/Sというキャリア視点——それぞれが別々ではなく、つながっています。
              </p>
              <p>
                <strong>「自分アップデート会」</strong>は、インプットで終わりがちな学びに"行動へのブリッジ"を作る場として新設しました。宣言して、振り返って、また宣言する——この小さなサイクルが、数ヶ月後の実力差になります。ぜひ習慣にしてください。
              </p>
              <p>
                ゼミも着実に進んでいます。<strong>経理上級コース・即戦力経理ゼミ</strong>では、教科書には載っていないリアルな判断基準を伝えています。ゼミ生の皆さんは、ぜひコミュニティQ&Aでゼミで学んだことをどんどんシェアして、全体の学びに還元してください！
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <FeedbackChip icon={<CheckCircle2 className="w-4 h-4 text-green-500"/>} label="AIリスクの実務対応" />
            <FeedbackChip icon={<CheckCircle2 className="w-4 h-4 text-green-500"/>} label="自分アップデート会の新設" />
            <FeedbackChip icon={<CheckCircle2 className="w-4 h-4 text-green-500"/>} label="ゼミの本格稼働" />
          </div>
        </div>
      </section>

      {/* ─── 5月予告 ─── */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
          <Target className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-bold text-slate-900">5月の講座・イベント予告</h2>
        </div>
        <div className="px-6 py-4">
          <p className="text-sm text-slate-500 mb-4">詳細は順次CuelLinkに公開されます。お楽しみに！</p>
          <div className="space-y-2">
            {[
              '消費税申告実務（インボイス対応含む）',
              'freee応用編：自動化と月次決算ルーティン',
              'AIを使った業務効率化ワークショップ',
              '自分アップデート会（Saturday Morning / Weekday Night）',
              'キャリア戦略ワークショップ',
              'ゼミ授業の継続（即戦力経理・経理上級コース）',
            ].map((t, i) => (
              <div key={t} className="flex items-center gap-3 text-sm text-slate-700">
                <span className="text-primary-500 font-bold w-4 flex-shrink-0">{i + 1}</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── スタンダードプランCTA ─── */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <p className="text-primary-200 text-xs font-semibold tracking-wide mb-1">スタンダードプラン限定コンテンツ</p>
            <h3 className="text-xl font-bold mb-3">
              4月はスタンダード限定が7本
            </h3>
            <ul className="space-y-2 text-sm text-primary-100 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-300 flex-shrink-0" />
                その情報、AIに入れても大丈夫？（4/4）— 実務AI利用の判断基準
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-300 flex-shrink-0" />
                齋藤のなんでも相談会（4/9）— リアルタイム直接相談、アーカイブなし
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-300 flex-shrink-0" />
                自分アップデート会（4/11, 4/15）— 月2回の振り返り・アクション宣言
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-300 flex-shrink-0" />
                税効果会計の実践講義（4/11）— 繰延税金資産・負債を60分で習得
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-300 flex-shrink-0" />
                「自分という会社」の決算書（4/21）— キャリアの財務視点、アーカイブなし
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
            新年度の4月も限定コンテンツ・なんでも相談会・自分アップデート会へのご参加ありがとうございました。5月もさらに実践的なコンテンツをお届けします。学びを行動に変えるサイクルを一緒に続けていきましょう！
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
    all:               <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">全員参加OK</span>,
    standard:          <span className="flex items-center gap-1 text-xs bg-primary-600 text-white px-2 py-0.5 rounded-full font-medium"><Lock className="w-3 h-3" />スタンダード限定</span>,
    'standard-single': <span className="flex items-center gap-1 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium"><Lock className="w-3 h-3" />スタンダード無料・スポット購入可</span>,
    seminar:           <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-0.5 rounded-full font-medium">ゼミ授業</span>,
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
