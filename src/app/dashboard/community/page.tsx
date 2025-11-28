'use client';

import { useState } from 'react';
import { Search, Plus, MoreVertical, Send, Image as ImageIcon, Smile, Paperclip } from 'lucide-react';

export default function CommunityPage() {
  const [activeChatId, setActiveChatId] = useState('class-1');

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* 左サイド: チャットリスト (1/4) */}
      <div className="w-80 flex-shrink-0 border-r border-slate-200 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">メッセージ</h2>
            <button className="p-1 hover:bg-slate-200 rounded-full text-slate-500">
              <Plus size={20} />
            </button>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="検索..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-6">
          {/* カテゴリ: クラスチャット */}
          <section>
            <h3 className="px-2 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">クラスチャット</h3>
            <div className="space-y-1">
              <ChatListItem 
                id="class-1"
                name="UI/UXデザイン実践マスター"
                lastMessage="次回の課題について質問です..."
                time="10:00"
                unreadCount={3}
                isActive={activeChatId === 'class-1'}
                onClick={() => setActiveChatId('class-1')}
              />
            </div>
          </section>

          {/* カテゴリ: グループチャット */}
          <section>
            <h3 className="px-2 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">グループチャット</h3>
            <div className="space-y-1">
              <ChatListItem 
                id="group-a"
                name="グループA (課題制作)"
                lastMessage="鈴木さん: 資料共有ありがとうございます！"
                time="昨日"
                unreadCount={0}
                isActive={activeChatId === 'group-a'}
                onClick={() => setActiveChatId('group-a')}
              />
              <ChatListItem 
                id="group-study"
                name="もくもく会"
                lastMessage="本日20時から開催します"
                time="11/20"
                unreadCount={0}
                isActive={activeChatId === 'group-study'}
                onClick={() => setActiveChatId('group-study')}
              />
            </div>
          </section>

          {/* カテゴリ: 運営・個別 */}
          <section>
            <h3 className="px-2 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">運営・サポート</h3>
            <div className="space-y-1">
              <ChatListItem 
                id="support"
                name="運営事務局"
                lastMessage="受講料のお支払いについて"
                time="11/15"
                unreadCount={1}
                isActive={activeChatId === 'support'}
                onClick={() => setActiveChatId('support')}
              />
            </div>
          </section>
        </div>
      </div>

      {/* メイン: チャットルーム (3/4) */}
      <div className="flex-1 flex flex-col bg-white">
        {/* チャットヘッダー */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
               U
             </div>
             <div>
               <h2 className="font-bold text-slate-900">UI/UXデザイン実践マスター</h2>
               <p className="text-xs text-slate-500">24名が参加中</p>
             </div>
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* メッセージエリア */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
           {/* 日付区切り */}
           <div className="flex justify-center">
             <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">2024年11月21日</span>
           </div>

           <MessageBubble 
             sender="田中 講師"
             avatar="T"
             time="10:00"
             content="みなさん、おはようございます。本日の課題について補足資料を共有します。"
             isOwn={false}
           />
           
           <MessageBubble 
             sender="佐藤 花子"
             avatar="S"
             time="10:05"
             content="ありがとうございます！確認します。"
             isOwn={false}
           />

           <MessageBubble 
             sender="自分"
             avatar="Me"
             time="10:10"
             content="質問があります。補足資料の3ページ目の図版についてですが、これはFigmaで作成しても良いでしょうか？"
             isOwn={true}
             status="read"
           />

           <MessageBubble 
             sender="田中 講師"
             avatar="T"
             time="10:15"
             content="はい、Figmaで作成していただいて構いません。ベクターデータとして提出してください。"
             isOwn={false}
           />
        </div>

        {/* 入力エリア */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200">
              <Plus size={20} />
            </button>
            <div className="flex-1 min-h-[44px]">
               <textarea 
                 placeholder="メッセージを入力..." 
                 className="w-full h-full bg-transparent border-none focus:ring-0 resize-none py-2.5 text-sm max-h-32"
                 rows={1}
               />
            </div>
            <div className="flex items-center gap-1 pb-1">
               <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 hidden sm:block">
                 <ImageIcon size={20} />
               </button>
               <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 hidden sm:block">
                 <Smile size={20} />
               </button>
               <button className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 shadow-sm ml-1">
                 <Send size={18} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatListItem({ id, name, lastMessage, time, unreadCount, isActive, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors
        ${isActive ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'hover:bg-slate-100'}
      `}
    >
      <div className="relative">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
          ${isActive ? 'bg-primary-100 text-primary-700' : 'bg-slate-200 text-slate-500'}
        `}>
          {name.charAt(0)}
        </div>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center border border-white">
            {unreadCount}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
          <span className={`text-sm font-semibold truncate ${isActive ? 'text-primary-900' : 'text-slate-900'}`}>{name}</span>
          <span className="text-xs text-slate-400 flex-shrink-0">{time}</span>
        </div>
        <p className={`text-xs truncate ${unreadCount > 0 ? 'font-semibold text-slate-700' : 'text-slate-500'}`}>
          {lastMessage}
        </p>
      </div>
    </button>
  );
}

function MessageBubble({ sender, avatar, time, content, isOwn, status }: any) {
  return (
    <div className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
      <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-xs font-bold text-slate-600">
        {avatar}
      </div>
      <div className={`flex flex-col max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
        <div className="flex items-baseline gap-2 mb-1 px-1">
          <span className="text-xs text-slate-500 font-medium">{sender}</span>
          <span className="text-xs text-slate-400">{time}</span>
        </div>
        <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm
          ${isOwn 
            ? 'bg-primary-600 text-white rounded-tr-none' 
            : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none'}
        `}>
          {content}
        </div>
        {isOwn && status === 'read' && (
          <span className="text-[10px] text-primary-600 font-medium mt-1 px-1">既読</span>
        )}
      </div>
    </div>
  );
}

