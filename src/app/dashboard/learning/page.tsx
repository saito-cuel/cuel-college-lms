'use client';

import { useState } from 'react';
import { PlayCircle, FileText, CheckCircle2, Circle, ExternalLink, Book } from 'lucide-react';

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState<'required' | 'optional'>('required');

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">学習コンテンツ</h1>
          <p className="text-slate-600">ワークショップに向けた事前学習と参考資料</p>
        </div>
      </header>

      {/* タブ切り替え */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('required')}
            className={`
              whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
              ${activeTab === 'required'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}
            `}
          >
            事前学習 (必須)
          </button>
          <button
            onClick={() => setActiveTab('optional')}
            className={`
              whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
              ${activeTab === 'optional'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}
            `}
          >
            参考資料 (任意)
          </button>
        </nav>
      </div>

      {/* コンテンツエリア */}
      <div className="min-h-[400px]">
        {activeTab === 'required' ? <RequiredContent /> : <OptionalContent />}
      </div>
    </div>
  );
}

function RequiredContent() {
  const items = [
    { id: 1, title: 'UIデザインの原則', type: 'video', duration: '15分', status: 'completed' },
    { id: 2, title: 'Figmaの基本操作', type: 'video', duration: '20分', status: 'completed' },
    { id: 3, title: 'デザインシステム概論', type: 'text', duration: '10分', status: 'incomplete' },
    { id: 4, title: 'アクセシビリティガイドライン', type: 'text', duration: '25分', status: 'incomplete' },
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden">
      <ul role="list" className="divide-y divide-slate-100">
        {items.map((item) => (
          <li key={item.id} className="p-4 sm:px-6 hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {item.status === 'completed' ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6 text-slate-300" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-medium text-slate-900 truncate">{item.title}</h3>
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    item.type === 'video' 
                      ? 'bg-blue-50 text-blue-700 ring-blue-600/20' 
                      : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                  }`}>
                    {item.type === 'video' ? '動画' : 'テキスト'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    {item.type === 'video' ? <PlayCircle size={14} /> : <FileText size={14} />}
                    {item.type === 'video' ? '視聴時間' : '読了時間'}: {item.duration}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                 <button className="btn-secondary text-xs px-3 py-1.5">
                    {item.status === 'completed' ? '復習する' : '開始する'}
                 </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OptionalContent() {
  return (
    <div className="space-y-8">
      {/* 図書 */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Book className="w-5 h-5 text-primary-600" />
          推奨図書
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="group relative bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                ノンデザイナーズ・デザインブック
              </h4>
              <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                デザインの基本原則（近接、整列、反復、コントラスト）を学ぶための必読書。
              </p>
              <a href="#" className="text-sm font-medium text-primary-600 flex items-center gap-1">
                Amazonで見る <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Webサイト */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-primary-600" />
          参考Webサイト
        </h3>
        <div className="bg-white shadow-sm rounded-lg border border-slate-200">
          <ul role="list" className="divide-y divide-slate-100">
            {[1, 2, 3].map((i) => (
              <li key={i} className="p-4 hover:bg-slate-50 transition-colors">
                <a href="#" className="flex items-center justify-between group">
                  <div>
                     <h4 className="text-sm font-medium text-slate-900 group-hover:text-primary-600 transition-colors">
                       Material Design Guidelines
                     </h4>
                     <p className="text-xs text-slate-500 mt-1">Googleが提唱するデザインシステムガイドライン</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-primary-600" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

