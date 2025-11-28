'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle2, MessageSquare, Clock, AlertCircle, PlayCircle } from 'lucide-react';

export default function WorksPage() {
  const [selectedWorkId, setSelectedWorkId] = useState(1);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* 左サイド: ワーク一覧 (1/4) */}
      <div className="lg:w-1/4 flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden h-full">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-bold text-slate-900">ワーク一覧</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <WorkListItem 
            id={1}
            title="Webデザイン基礎 課題1" 
            dueDate="本日 23:59" 
            status="unsubmitted"
            isSelected={selectedWorkId === 1}
            onClick={() => setSelectedWorkId(1)}
          />
          <WorkListItem 
            id={2}
            title="マーケティング概論 レポート" 
            dueDate="2024/11/20" 
            status="feedback_ready"
            isSelected={selectedWorkId === 2}
            onClick={() => setSelectedWorkId(2)}
          />
          <WorkListItem 
            id={3}
            title="JavaScript基礎 演習" 
            dueDate="2024/11/15" 
            status="submitted"
            isSelected={selectedWorkId === 3}
            onClick={() => setSelectedWorkId(3)}
          />
        </div>
      </div>

      {/* 中央: 詳細ビュー (3/4) */}
      <div className="lg:w-3/4 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col h-full">
        {selectedWorkId === 1 ? <WorkDetailUnsubmitted /> : selectedWorkId === 2 ? <WorkDetailFeedback /> : <WorkDetailSubmitted />}
      </div>
    </div>
  );
}

function WorkListItem({ id, title, dueDate, status, isSelected, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left p-4 border-b border-slate-100 transition-colors hover:bg-slate-50
        ${isSelected ? 'bg-blue-50 hover:bg-blue-50 border-l-4 border-l-primary-500' : 'border-l-4 border-l-transparent'}
      `}
    >
      <div className="flex justify-between items-start mb-1">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium
          ${status === 'unsubmitted' ? 'bg-red-100 text-red-700' : 
            status === 'submitted' ? 'bg-blue-100 text-blue-700' : 
            'bg-green-100 text-green-700'}
        `}>
          {status === 'unsubmitted' ? '未提出' : status === 'submitted' ? '提出済' : 'FBあり'}
        </span>
        {status === 'unsubmitted' && <span className="text-xs text-red-600 font-bold flex items-center gap-1"><Clock size={12}/> 残り3時間</span>}
      </div>
      <h3 className={`text-sm font-semibold mb-1 ${isSelected ? 'text-primary-900' : 'text-slate-900'}`}>{title}</h3>
      <div className="text-xs text-slate-500">期限: {dueDate}</div>
    </button>
  );
}

function WorkDetailUnsubmitted() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8">
      {/* ヘッダー */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-red-600 font-semibold mb-2">
          <AlertCircle size={20} />
          <span>提出期限が迫っています</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Webデザイン基礎 課題1: ランディングページのデザイン</h1>
        <p className="text-slate-600">
          提供されたワイヤーフレームを元に、架空のサービスのランディングページをデザインしてください。
        </p>
      </div>

      {/* 設問エリア */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary-600" />
          課題内容
        </h2>
        <div className="prose prose-slate max-w-none bg-slate-50 p-6 rounded-lg">
          <p>以下の要件を満たすデザインを作成してください：</p>
          <ul>
            <li>ターゲット層：20代〜30代の若手ビジネスパーソン</li>
            <li>トンマナ：信頼感、シンプル、モダン</li>
            <li>必須セクション：ヒーロー、特徴、料金プラン、CTA</li>
          </ul>
          <p>提出形式：Figmaのリンク、またはエクスポートした画像ファイル（JPG/PNG）</p>
        </div>
      </section>

      {/* 提出エリア */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary-600" />
          提出
        </h2>
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-slate-400" />
          <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
            <label className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500">
              <span>ファイルをアップロード</span>
            </label>
            <p className="pl-1">またはドラッグ＆ドロップ</p>
          </div>
          <p className="text-xs text-slate-500 mt-2">PNG, JPG, PDF up to 10MB (複数ファイル可)</p>
        </div>
        
        <div className="flex justify-end pt-4">
          <button className="btn-primary w-full sm:w-auto px-8">課題を提出する</button>
        </div>
      </section>
    </div>
  );
}

function WorkDetailFeedback() {
    return (
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <div className="border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2 text-green-600 font-semibold mb-2">
            <CheckCircle2 size={20} />
            <span>フィードバックが届いています</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">マーケティング概論 レポート</h1>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 提出物プレビュー */}
            <div className="space-y-4">
                <h3 className="font-bold text-slate-900">提出済みファイル</h3>
                <div className="border rounded-lg p-4 bg-slate-50 flex items-center gap-3">
                    <FileText className="text-slate-400" />
                    <div>
                        <div className="text-sm font-medium">marketing_report_v1.pdf</div>
                        <div className="text-xs text-slate-500">2024/11/20 10:00 提出</div>
                    </div>
                </div>
            </div>

            {/* フィードバックエリア */}
            <div className="space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary-600" />
                    講師からのコメント
                </h3>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0"></div>
                        <div>
                            <div className="text-sm font-bold text-slate-900">田中 講師</div>
                            <p className="text-sm text-slate-700 mt-1">
                                全体的に良くまとまっています。特に後半の分析パートは鋭い視点です。
                                ただし、序論の市場規模のデータが少し古いようです。最新の統計（2023年以降）を参照するとより説得力が増すでしょう。
                            </p>
                        </div>
                    </div>

                    {/* 動画フィードバック（埋め込み想定） */}
                    <div className="bg-black/5 rounded-lg aspect-video flex items-center justify-center relative group cursor-pointer overflow-hidden">
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <PlayCircle size={48} className="text-white" />
                        </div>
                        <span className="text-slate-500 text-sm">フィードバック動画プレイヤー</span>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button className="btn-secondary text-primary-600 border-primary-600 hover:bg-primary-50">
                        見直し・再提出する
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
}

function WorkDetailSubmitted() {
    return (
        <div className="flex-1 flex items-center justify-center p-6 text-slate-500">
            <div className="text-center">
                <CheckCircle2 size={48} className="mx-auto mb-4 text-slate-300" />
                <h2 className="text-xl font-medium text-slate-900 mb-2">提出済み</h2>
                <p>フィードバックをお待ちください</p>
            </div>
        </div>
    );
}

