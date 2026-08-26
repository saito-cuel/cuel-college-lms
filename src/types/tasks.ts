export type TaskPriority = 'q1' | 'q2' | 'q3' | 'q4';
// Q1: 紧急×重要  Q2: 重要・非紧急  Q3: 紧急・重要でない  Q4: 非紧急・重要でない

export type TaskSource = 'manual' | 'email' | 'chat' | 'calendar' | 'other';

export type Q2Category =
  | 'exercise'
  | 'life-planning'
  | 'company-strategy'
  | 'self-learning'
  | 'reflection'
  | 'other';

export interface Task {
  id: string;
  title: string;
  description?: string;
  source: TaskSource;
  sourceText?: string;
  priority: TaskPriority;
  deadline?: string; // YYYY-MM-DD
  estimatedMinutes?: number;
  completed: boolean;
  calendarEventId?: string;
  createdAt: string;
  tags?: string[];
}

export interface Q2TimeBlock {
  id: string;
  category: Q2Category;
  title: string;
  description?: string;
  weeklyMinutes: number;
  preferredDays: string[];
  preferredTimeStart: string;
  preferredTimeEnd: string;
  color: string;
  colorId: string;
  icon: string;
  enabled: boolean;
}

export interface ExtractedTask {
  title: string;
  description?: string;
  priority: TaskPriority;
  deadline?: string;
  estimatedMinutes?: number;
  tags?: string[];
}

export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}
