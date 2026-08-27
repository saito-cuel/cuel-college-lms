'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  CheckCircle2, Circle, Trash2, Plus, Calendar, Star,
  Inbox, LayoutGrid, Clock, AlertCircle, ChevronDown,
  Loader2, ExternalLink, RefreshCw, X, Tag
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type TaskPriority = 'q1' | 'q2' | 'q3' | 'q4';
type Tab = 'inbox' | 'matrix' | 'q2' | 'calendar';

interface Task {
  id: string;
  title: string;
  description?: string;
  source: string;
  priority: TaskPriority;
  deadline?: string;
  estimatedMinutes?: number;
  completed: boolean;
  calendarEventId?: string;
  createdAt: string;
  tags?: string[];
}

interface ExtractedTask {
  title: string;
  description?: string;
  priority: TaskPriority;
  deadline?: string;
  estimatedMinutes?: number;
  tags?: string[];
}

interface Q2Block {
  id: string;
  title: string;
  icon: string;
  weeklyMinutes: number;
  preferredDays: string[];
  preferredTimeStart: string;
  preferredTimeEnd: string;
  colorClass: string;
  colorId: string;
  enabled: boolean;
}

interface CalEvent {
  id: string;
  summary: string;
  description?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PRIORITY_CONFIG: Record<TaskPriority, {
  label: string; sub: string;
  bg: string; border: string; text: string; badge: string; header: string;
}> = {
  q1: {
    label: '緊急 × 重要', sub: '今すぐ対応',
    bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700',
    badge: 'bg-red-100 text-red-700', header: 'bg-red-100 border-red-200',
  },
  q2: {
    label: '重要・非緊急', sub: '計画的に実施',
    bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700', header: 'bg-emerald-100 border-emerald-200',
  },
  q3: {
    label: '緊急・重要でない', sub: '委任・効率化',
    bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-700', header: 'bg-amber-100 border-amber-200',
  },
  q4: {
    label: '非緊急・重要でない', sub: '削減・廃止',
    bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-500',
    badge: 'bg-slate-100 text-slate-500', header: 'bg-slate-100 border-slate-200',
  },
};

const DAY_LABELS: Record<string, string> = {
  mon: '月', tue: '火', wed: '水', thu: '木', fri: '金', sat: '土', sun: '日',
};

const DEFAULT_Q2_BLOCKS: Q2Block[] = [
  {
    id: 'exercise', title: '運動・健康', icon: '🏃',
    weeklyMinutes: 135, preferredDays: ['mon', 'wed', 'fri'],
    preferredTimeStart: '07:00', preferredTimeEnd: '07:45',
    colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-200', colorId: '2', enabled: true,
  },
  {
    id: 'life-planning', title: '人生設計・振り返り', icon: '🌟',
    weeklyMinutes: 60, preferredDays: ['sun'],
    preferredTimeStart: '09:00', preferredTimeEnd: '10:00',
    colorClass: 'bg-indigo-100 text-indigo-800 border-indigo-200', colorId: '9', enabled: true,
  },
  {
    id: 'company-strategy', title: '会社戦略・中長期思考', icon: '🏢',
    weeklyMinutes: 120, preferredDays: ['sat'],
    preferredTimeStart: '09:00', preferredTimeEnd: '11:00',
    colorClass: 'bg-blue-100 text-blue-800 border-blue-200', colorId: '1', enabled: true,
  },
  {
    id: 'self-learning', title: '自己学習・スキルアップ', icon: '📚',
    weeklyMinutes: 60, preferredDays: ['tue', 'thu'],
    preferredTimeStart: '07:00', preferredTimeEnd: '07:30',
    colorClass: 'bg-amber-100 text-amber-800 border-amber-200', colorId: '5', enabled: true,
  },
  {
    id: 'reflection', title: '内省・日記', icon: '✍️',
    weeklyMinutes: 105, preferredDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    preferredTimeStart: '22:00', preferredTimeEnd: '22:15',
    colorClass: 'bg-purple-100 text-purple-800 border-purple-200', colorId: '3', enabled: true,
  },
];

const STORAGE_TASKS = 'saito_tasks_v1';
const STORAGE_Q2 = 'saito_q2_blocks_v1';

// ─── Utility helpers ─────────────────────────────────────────────────────────

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function formatDeadline(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return '今日';
  if (diff === 1) return '明日';
  if (diff < 0) return `${Math.abs(diff)}日前`;
  return `${diff}日後 (${iso})`;
}

function formatEventTime(ev: CalEvent): string {
  const dt = ev.start.dateTime || ev.start.date;
  if (!dt) return '';
  const d = new Date(dt);
  return d.toLocaleString('ja-JP', {
    month: 'numeric', day: 'numeric', weekday: 'short',
    hour: '2-digit', minute: '2-digit',
  });
}

// Calculate next N dates for a given weekday index (0=Sun)
function nextDatesForDay(dayIndex: number, weeksAhead: number): Date[] {
  const results: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let week = 0; week < weeksAhead; week++) {
    const d = new Date(today);
    let daysUntil = (dayIndex - today.getDay() + 7) % 7;
    if (daysUntil === 0) daysUntil = 7;
    d.setDate(d.getDate() + daysUntil + week * 7);
    results.push(d);
  }
  return results;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function TaskCard({
  task, onToggle, onDelete, onPriorityChange,
}: {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onPriorityChange: (p: TaskPriority) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const cfg = PRIORITY_CONFIG[task.priority];

  return (
    <div className={`group p-3 rounded-lg border ${task.completed ? 'opacity-50' : ''} ${cfg.bg} ${cfg.border}`}>
      <div className="flex items-start gap-2">
        <button onClick={onToggle} className="mt-0.5 flex-shrink-0 text-slate-400 hover:text-slate-700">
          {task.completed
            ? <CheckCircle2 className="w-4 h-4 text-green-500" />
            : <Circle className="w-4 h-4" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium leading-snug ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{task.description}</p>
          )}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {task.deadline && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                {formatDeadline(task.deadline)}
              </span>
            )}
            {task.estimatedMinutes && (
              <span className="text-xs text-slate-400">{task.estimatedMinutes}分</span>
            )}
            {task.tags?.map(t => (
              <span key={t} className="text-xs bg-white/70 border border-slate-200 px-1.5 py-0.5 rounded-full text-slate-500">
                {t}
              </span>
            ))}
            {task.calendarEventId && (
              <span className="text-xs text-green-600 flex items-center gap-0.5">
                <Calendar className="w-3 h-3" />連携済
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="relative">
            <button
              onClick={() => setShowMenu(v => !v)}
              className="p-1 rounded hover:bg-white/60 text-slate-400 hover:text-slate-600"
              title="優先度を変更"
            >
              <ChevronDown className="w-3 h-3" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-6 z-10 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[140px]">
                {(Object.keys(PRIORITY_CONFIG) as TaskPriority[]).map(p => (
                  <button
                    key={p}
                    onClick={() => { onPriorityChange(p); setShowMenu(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 ${task.priority === p ? 'font-bold' : ''}`}
                  >
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${PRIORITY_CONFIG[p].badge.split(' ')[0]}`} />
                    {PRIORITY_CONFIG[p].label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={onDelete} className="p-1 rounded hover:bg-white/60 text-slate-400 hover:text-red-500">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

function QuadrantPanel({
  priority, tasks, onToggle, onDelete, onPriorityChange,
}: {
  priority: TaskPriority;
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange: (id: string, p: TaskPriority) => void;
}) {
  const cfg = PRIORITY_CONFIG[priority];
  return (
    <div className={`rounded-xl border ${cfg.border} flex flex-col min-h-[200px]`}>
      <div className={`px-4 py-3 rounded-t-xl border-b ${cfg.header} ${cfg.border}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-bold ${cfg.text}`}>{cfg.label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{cfg.sub}</p>
          </div>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>
            {tasks.length}件
          </span>
        </div>
      </div>
      <div className="p-3 flex-1 space-y-2 overflow-y-auto max-h-[320px]">
        {tasks.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">タスクなし</p>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={() => onToggle(task.id)}
              onDelete={() => onDelete(task.id)}
              onPriorityChange={p => onPriorityChange(task.id, p)}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [q2Blocks, setQ2Blocks] = useState<Q2Block[]>(DEFAULT_Q2_BLOCKS);
  const [activeTab, setActiveTab] = useState<Tab>('matrix');

  // Inbox state
  const [inputText, setInputText] = useState('');
  const [extractedTasks, setExtractedTasks] = useState<ExtractedTask[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState('');

  // Quick-add state
  const [quickTitle, setQuickTitle] = useState('');
  const [quickPriority, setQuickPriority] = useState<TaskPriority>('q3');
  const [quickDeadline, setQuickDeadline] = useState('');

  // Calendar state
  const [calConnected, setCalConnected] = useState(false);
  const [calEvents, setCalEvents] = useState<CalEvent[]>([]);
  const [calLoading, setCalLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncingQ2, setSyncingQ2] = useState<string | null>(null);
  const [calError, setCalError] = useState('');

  // ── Calendar check ───────────────────────────────────────────────────────

  const checkCalendar = useCallback(async () => {
    setCalLoading(true);
    try {
      const res = await fetch('/api/calendar/events');
      if (res.ok) {
        const data = await res.json();
        setCalConnected(true);
        setCalEvents(data.events || []);
      } else {
        setCalConnected(false);
      }
    } catch {
      setCalConnected(false);
    } finally {
      setCalLoading(false);
    }
  }, []);

  // ── Persistence ──────────────────────────────────────────────────────────

  useEffect(() => {
    try {
      const t = localStorage.getItem(STORAGE_TASKS);
      if (t) setTasks(JSON.parse(t));
      const q = localStorage.getItem(STORAGE_Q2);
      if (q) setQ2Blocks(JSON.parse(q));
    } catch { /* ignore */ }

    // Handle URL params after calendar OAuth
    const params = new URLSearchParams(window.location.search);
    if (params.get('calendar_connected')) {
      setActiveTab('calendar');
      window.history.replaceState({}, '', '/dashboard/tasks');
    }
    if (params.get('calendar_error')) {
      setCalError('Googleカレンダーの連携に失敗しました。再度お試しください。');
      window.history.replaceState({}, '', '/dashboard/tasks');
    }

    checkCalendar();
  }, [checkCalendar]);

  useEffect(() => {
    localStorage.setItem(STORAGE_TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_Q2, JSON.stringify(q2Blocks));
  }, [q2Blocks]);

  // ── Task mutations ───────────────────────────────────────────────────────

  const addTask = (partial: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    setTasks(prev => [{
      ...partial,
      id: genId(),
      completed: false,
      createdAt: new Date().toISOString(),
    }, ...prev]);
  };

  const toggleTask = (id: string) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const deleteTask = (id: string) =>
    setTasks(prev => prev.filter(t => t.id !== id));

  const updatePriority = (id: string, priority: TaskPriority) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, priority } : t));

  // ── Quick add ────────────────────────────────────────────────────────────

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    addTask({
      title: quickTitle.trim(),
      source: 'manual',
      priority: quickPriority,
      deadline: quickDeadline || undefined,
    });
    setQuickTitle('');
    setQuickDeadline('');
  };

  // ── Task extraction ──────────────────────────────────────────────────────

  const extractTasks = async () => {
    if (!inputText.trim()) return;
    setIsExtracting(true);
    setExtractError('');
    setExtractedTasks([]);
    try {
      const res = await fetch('/api/tasks/extract', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();
      if (!res.ok) { setExtractError(data.error || 'エラーが発生しました'); return; }
      setExtractedTasks(data.tasks || []);
      if ((data.tasks || []).length === 0) setExtractError('タスクが見つかりませんでした');
    } catch {
      setExtractError('通信エラーが発生しました');
    } finally {
      setIsExtracting(false);
    }
  };

  const approveTask = (task: ExtractedTask) => {
    addTask({ title: task.title, description: task.description, source: 'email',
      priority: task.priority, deadline: task.deadline,
      estimatedMinutes: task.estimatedMinutes, tags: task.tags });
    setExtractedTasks(prev => prev.filter(t => t !== task));
  };

  const approveAll = () => {
    extractedTasks.forEach(task =>
      addTask({ title: task.title, description: task.description, source: 'email',
        priority: task.priority, deadline: task.deadline,
        estimatedMinutes: task.estimatedMinutes, tags: task.tags })
    );
    setExtractedTasks([]);
    setInputText('');
  };

  // ── Calendar sync ────────────────────────────────────────────────────────

  const syncToCalendar = async () => {
    const toSync = tasks.filter(t => !t.completed && t.deadline && !t.calendarEventId);
    if (!toSync.length) return;
    setIsSyncing(true);
    try {
      const res = await fetch('/api/calendar/sync', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ tasks: toSync }),
      });
      const data = await res.json();
      if (res.ok && data.results) {
        setTasks(prev => prev.map(t => {
          const r = data.results.find((x: { taskId: string; eventId: string }) => x.taskId === t.id);
          return r ? { ...t, calendarEventId: r.eventId } : t;
        }));
        checkCalendar();
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const syncQ2Block = async (block: Q2Block) => {
    if (!calConnected) return;
    setSyncingQ2(block.id);

    const dayMap: Record<string, number> = {
      sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
    };

    const events = [];
    for (const day of block.preferredDays) {
      const dates = nextDatesForDay(dayMap[day], 4);
      for (const d of dates) {
        const dateStr = d.toISOString().split('T')[0];
        events.push({
          summary: `[Q2] ${block.icon} ${block.title}`,
          description: '重要だが緊急でないQ2タイムブロック',
          start: `${dateStr}T${block.preferredTimeStart}:00`,
          end: `${dateStr}T${block.preferredTimeEnd}:00`,
          colorId: block.colorId,
        });
      }
    }

    let ok = 0;
    for (const ev of events) {
      const res = await fetch('/api/calendar/events', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(ev),
      });
      if (res.ok) ok++;
    }
    setSyncingQ2(null);
    if (ok > 0) checkCalendar();
  };

  // ── Derived ──────────────────────────────────────────────────────────────

  const activeTasks = tasks.filter(t => !t.completed);
  const byPriority = {
    q1: activeTasks.filter(t => t.priority === 'q1'),
    q2: activeTasks.filter(t => t.priority === 'q2'),
    q3: activeTasks.filter(t => t.priority === 'q3'),
    q4: activeTasks.filter(t => t.priority === 'q4'),
  };
  const completedTasks = tasks.filter(t => t.completed);
  const pendingSync = activeTasks.filter(t => t.deadline && !t.calendarEventId).length;

  // ── Render ───────────────────────────────────────────────────────────────

  const tabs = [
    { id: 'inbox' as Tab, label: 'インボックス', icon: <Inbox className="w-4 h-4" /> },
    { id: 'matrix' as Tab, label: 'マトリクス', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'q2' as Tab, label: 'Q2ブロック', icon: <Star className="w-4 h-4" /> },
    { id: 'calendar' as Tab, label: 'カレンダー', icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">タスク管理</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            メール・チャットから自動抽出 &amp; Googleカレンダー連携
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium border ${
            calConnected
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${calConnected ? 'bg-green-500' : 'bg-slate-400'}`} />
            {calConnected ? 'カレンダー連携済' : 'カレンダー未連携'}
          </span>
          <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium">
            Q1 {byPriority.q1.length}
          </span>
          <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium">
            Q2 {byPriority.q2.length}
          </span>
          <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full font-medium">
            完了 {completedTasks.length}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab.id
                  ? 'border-sky-600 text-sky-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ── インボックス ──────────────────────────────────────────── */}
      {activeTab === 'inbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input panel */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Inbox className="w-4 h-4 text-sky-600" />
                メール・チャットを貼り付け
              </h2>
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="メール、Slack、LINEなどのテキストをここに貼り付けてください。AIがタスクを自動的に抽出します。"
                rows={10}
                className="w-full text-sm border border-slate-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 placeholder-slate-400"
              />
              {extractError && (
                <div className="mt-2 flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg p-2.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {extractError}
                </div>
              )}
              <button
                onClick={extractTasks}
                disabled={isExtracting || !inputText.trim()}
                className="mt-3 w-full py-2.5 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isExtracting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />AIが解析中…</>
                ) : (
                  <>タスクを自動抽出</>
                )}
              </button>
            </div>

            {/* Quick add manual task */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-sky-600" />
                手動でタスクを追加
              </h2>
              <form onSubmit={handleQuickAdd} className="space-y-2">
                <input
                  type="text"
                  value={quickTitle}
                  onChange={e => setQuickTitle(e.target.value)}
                  placeholder="タスク名を入力"
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <div className="flex gap-2">
                  <select
                    value={quickPriority}
                    onChange={e => setQuickPriority(e.target.value as TaskPriority)}
                    className="flex-1 text-xs border border-slate-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {(Object.keys(PRIORITY_CONFIG) as TaskPriority[]).map(p => (
                      <option key={p} value={p}>{PRIORITY_CONFIG[p].label}</option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={quickDeadline}
                    onChange={e => setQuickDeadline(e.target.value)}
                    className="flex-1 text-xs border border-slate-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!quickTitle.trim()}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  追加する
                </button>
              </form>
            </div>
          </div>

          {/* Extracted tasks panel */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-slate-900">
                抽出されたタスク
                {extractedTasks.length > 0 && (
                  <span className="ml-2 text-sky-600 text-sm">({extractedTasks.length}件)</span>
                )}
              </h2>
              {extractedTasks.length > 1 && (
                <button
                  onClick={approveAll}
                  className="text-xs text-sky-600 hover:text-sky-700 font-semibold border border-sky-200 px-2.5 py-1 rounded-lg"
                >
                  すべて追加
                </button>
              )}
            </div>

            {extractedTasks.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Inbox className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">テキストを貼り付けてAI抽出を実行してください</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {extractedTasks.map((task, i) => {
                  const cfg = PRIORITY_CONFIG[task.priority];
                  return (
                    <div key={i} className={`p-3 rounded-lg border ${cfg.bg} ${cfg.border}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800">{task.title}</p>
                          {task.description && (
                            <p className="text-xs text-slate-500 mt-0.5">{task.description}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${cfg.badge}`}>
                              {cfg.label}
                            </span>
                            {task.deadline && (
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />{formatDeadline(task.deadline)}
                              </span>
                            )}
                            {task.estimatedMinutes && (
                              <span className="text-xs text-slate-400">{task.estimatedMinutes}分</span>
                            )}
                            {task.tags?.map(t => (
                              <span key={t} className="text-xs bg-white/70 border border-slate-200 px-1.5 py-0.5 rounded-full text-slate-500">
                                <Tag className="w-2.5 h-2.5 inline mr-0.5" />{t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <button
                            onClick={() => approveTask(task)}
                            className="text-xs px-2.5 py-1.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700 font-medium"
                          >
                            追加
                          </button>
                          <button
                            onClick={() => setExtractedTasks(prev => prev.filter((_, j) => j !== i))}
                            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-white/60"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── マトリクス ────────────────────────────────────────────── */}
      {activeTab === 'matrix' && (
        <div className="space-y-4">
          {/* Quick add bar */}
          <form onSubmit={handleQuickAdd} className="flex gap-2 bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <input
              type="text"
              value={quickTitle}
              onChange={e => setQuickTitle(e.target.value)}
              placeholder="タスクをすばやく追加..."
              className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <select
              value={quickPriority}
              onChange={e => setQuickPriority(e.target.value as TaskPriority)}
              className="text-xs border border-slate-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {(Object.keys(PRIORITY_CONFIG) as TaskPriority[]).map(p => (
                <option key={p} value={p}>{PRIORITY_CONFIG[p].label}</option>
              ))}
            </select>
            <input
              type="date"
              value={quickDeadline}
              onChange={e => setQuickDeadline(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              type="submit"
              disabled={!quickTitle.trim()}
              className="px-4 py-2 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          {/* Eisenhower matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(['q1', 'q2', 'q3', 'q4'] as TaskPriority[]).map(p => (
              <QuadrantPanel
                key={p}
                priority={p}
                tasks={byPriority[p]}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onPriorityChange={updatePriority}
              />
            ))}
          </div>

          {/* Completed section */}
          {completedTasks.length > 0 && (
            <details className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-slate-600 hover:text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                完了済み ({completedTasks.length}件)
              </summary>
              <div className="px-4 pb-4 pt-1 space-y-2 max-h-64 overflow-y-auto">
                {completedTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTask(task.id)}
                    onDelete={() => deleteTask(task.id)}
                    onPriorityChange={p => updatePriority(task.id, p)}
                  />
                ))}
              </div>
            </details>
          )}
        </div>
      )}

      {/* ── Q2ブロック ────────────────────────────────────────────── */}
      {activeTab === 'q2' && (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
            <p className="font-bold mb-1">⭐ Q2タイムブロックとは</p>
            <p>緊急ではないが重要な活動（健康・戦略・学習・内省）を定期的にカレンダーに確保します。これを先に予定することで、日常業務に追われずに人生・事業の基盤を築けます。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {q2Blocks.map(block => (
              <div key={block.id} className={`bg-white rounded-xl border shadow-sm p-5 ${block.enabled ? '' : 'opacity-50'}`}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{block.icon}</span>
                    <div>
                      <p className="font-bold text-slate-900">{block.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">週 {block.weeklyMinutes}分</p>
                    </div>
                  </div>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={block.enabled}
                      onChange={e =>
                        setQ2Blocks(prev => prev.map(b =>
                          b.id === block.id ? { ...b, enabled: e.target.checked } : b
                        ))
                      }
                      className="w-4 h-4 rounded accent-sky-600"
                    />
                    <span className="text-xs text-slate-500">有効</span>
                  </label>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-12">曜日</span>
                    <div className="flex gap-1 flex-wrap">
                      {Object.entries(DAY_LABELS).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() =>
                            setQ2Blocks(prev => prev.map(b => {
                              if (b.id !== block.id) return b;
                              const days = b.preferredDays.includes(key)
                                ? b.preferredDays.filter(d => d !== key)
                                : [...b.preferredDays, key];
                              const mins = days.length *
                                (() => {
                                  const [sh, sm] = b.preferredTimeStart.split(':').map(Number);
                                  const [eh, em] = b.preferredTimeEnd.split(':').map(Number);
                                  return (eh * 60 + em) - (sh * 60 + sm);
                                })();
                              return { ...b, preferredDays: days, weeklyMinutes: mins };
                            }))
                          }
                          className={`text-xs w-7 h-7 rounded-full font-medium transition-colors ${
                            block.preferredDays.includes(key)
                              ? block.colorClass + ' border'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-12">時間</span>
                    <input
                      type="time"
                      value={block.preferredTimeStart}
                      onChange={e =>
                        setQ2Blocks(prev => prev.map(b =>
                          b.id === block.id ? { ...b, preferredTimeStart: e.target.value } : b
                        ))
                      }
                      className="text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                    <span className="text-xs text-slate-400">〜</span>
                    <input
                      type="time"
                      value={block.preferredTimeEnd}
                      onChange={e =>
                        setQ2Blocks(prev => prev.map(b =>
                          b.id === block.id ? { ...b, preferredTimeEnd: e.target.value } : b
                        ))
                      }
                      className="text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <button
                  onClick={() => syncQ2Block(block)}
                  disabled={!calConnected || !block.enabled || syncingQ2 === block.id}
                  title={!calConnected ? 'カレンダーを連携してください' : '今後4週間分をカレンダーに追加します'}
                  className="w-full py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5
                    bg-sky-600 hover:bg-sky-700 text-white
                    disabled:bg-slate-100 disabled:text-slate-400"
                >
                  {syncingQ2 === block.id
                    ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />設定中…</>
                    : <><Calendar className="w-3.5 h-3.5" />4週間分をカレンダーに設定</>
                  }
                </button>
                {!calConnected && (
                  <p className="text-xs text-center text-slate-400 mt-1">カレンダータブで連携してください</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── カレンダー ────────────────────────────────────────────── */}
      {activeTab === 'calendar' && (
        <div className="space-y-4">
          {calError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {calError}
              <button onClick={() => setCalError('')} className="ml-auto"><X className="w-4 h-4" /></button>
            </div>
          )}

          {/* Connection card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-sky-600" />
                  Googleカレンダー連携
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {calConnected
                    ? '連携済みです。タスクや Q2 ブロックをカレンダーに同期できます。'
                    : 'Googleアカウントと連携して、タスクをカレンダーに自動登録します。'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {calConnected && (
                  <button
                    onClick={checkCalendar}
                    disabled={calLoading}
                    className="flex items-center gap-1.5 text-sm text-slate-600 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${calLoading ? 'animate-spin' : ''}`} />
                    更新
                  </button>
                )}
                <a
                  href="/api/calendar/auth"
                  className={`flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors ${
                    calConnected
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-sky-600 text-white hover:bg-sky-700'
                  }`}
                >
                  <ExternalLink className="w-4 h-4" />
                  {calConnected ? '再連携' : 'Googleカレンダーと連携する'}
                </a>
              </div>
            </div>
          </div>

          {/* Sync tasks */}
          {calConnected && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900">タスクをカレンダーに同期</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    期限が設定されたタスク（未同期 {pendingSync}件）をカレンダーに追加します
                  </p>
                </div>
                <button
                  onClick={syncToCalendar}
                  disabled={isSyncing || pendingSync === 0}
                  className="flex items-center gap-2 text-sm font-semibold px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:bg-slate-100 disabled:text-slate-400 transition-colors"
                >
                  {isSyncing
                    ? <><Loader2 className="w-4 h-4 animate-spin" />同期中…</>
                    : <><Calendar className="w-4 h-4" />{pendingSync}件を同期</>
                  }
                </button>
              </div>

              {/* Tasks with deadlines */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {activeTasks.filter(t => t.deadline).length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-4">期限付きのタスクがありません</p>
                ) : (
                  activeTasks.filter(t => t.deadline).map(task => (
                    <div key={task.id} className="flex items-center justify-between text-sm border border-slate-100 rounded-lg px-3 py-2 bg-slate-50">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${PRIORITY_CONFIG[task.priority].badge}`}>
                          {task.priority.toUpperCase()}
                        </span>
                        <span className="truncate text-slate-800">{task.title}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className="text-xs text-slate-500">{formatDeadline(task.deadline)}</span>
                        {task.calendarEventId
                          ? <CheckCircle2 className="w-4 h-4 text-green-500" />
                          : <Clock className="w-4 h-4 text-slate-300" />
                        }
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Upcoming events */}
          {calConnected && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="font-bold text-slate-900 mb-3">
                今後2週間の予定
                <span className="ml-2 text-sm font-normal text-slate-500">({calEvents.length}件)</span>
              </h3>
              {calLoading ? (
                <div className="flex items-center justify-center py-8 text-slate-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              ) : calEvents.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-6">予定がありません</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {calEvents.map(ev => (
                    <div key={ev.id} className={`flex items-start gap-3 p-2.5 rounded-lg border text-sm ${
                      ev.summary.startsWith('[Q2]')
                        ? 'bg-emerald-50 border-emerald-100'
                        : ev.summary.startsWith('[Q1]')
                        ? 'bg-red-50 border-red-100'
                        : 'bg-slate-50 border-slate-100'
                    }`}>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 truncate">{ev.summary}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{formatEventTime(ev)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Setup guide */}
          {!calConnected && (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-3">セットアップ手順</h3>
              <ol className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="font-bold text-sky-600 flex-shrink-0">1.</span>
                  <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline flex items-center gap-1">
                    Google Cloud Console <ExternalLink className="w-3 h-3" />
                  </a>でプロジェクトを作成し、Google Calendar APIを有効化
                </li>
                <li className="flex gap-2"><span className="font-bold text-sky-600 flex-shrink-0">2.</span>
                  OAuthクライアントIDを作成（リダイレクトURIに <code className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-xs">/api/calendar/callback</code> を追加）
                </li>
                <li className="flex gap-2"><span className="font-bold text-sky-600 flex-shrink-0">3.</span>
                  <code className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-xs">.env.local</code> に <code className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-xs">GOOGLE_CLIENT_ID</code> と <code className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-xs">GOOGLE_CLIENT_SECRET</code> を設定
                </li>
                <li className="flex gap-2"><span className="font-bold text-sky-600 flex-shrink-0">4.</span>
                  上の「Googleカレンダーと連携する」ボタンをクリック
                </li>
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
