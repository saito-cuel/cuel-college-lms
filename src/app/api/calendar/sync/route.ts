import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('google_access_token')?.value;
  if (!accessToken) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const { tasks } = await request.json();
  if (!Array.isArray(tasks)) return NextResponse.json({ error: '無効なリクエスト' }, { status: 400 });

  const colorMap: Record<string, string> = { q1: '11', q2: '2', q3: '5', q4: '8' };
  const priorityLabel: Record<string, string> = {
    q1: '[Q1 紧急重要]', q2: '[Q2 重要]', q3: '[Q3 紧急]', q4: '[Q4]',
  };

  const results: { taskId: string; eventId: string }[] = [];

  for (const task of tasks) {
    if (!task.deadline) continue;
    const mins = task.estimatedMinutes || 30;
    const pad = (n: number) => String(n).padStart(2, '0');
    const endTotal = 9 * 60 + mins;
    const start = `${task.deadline}T09:00:00`;
    const end = `${task.deadline}T${pad(Math.floor(endTotal / 60))}:${pad(endTotal % 60)}:00`;

    const res = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          summary: `${priorityLabel[task.priority] || ''} ${task.title}`,
          description: [task.description, task.tags?.length ? `タグ: ${task.tags.join(', ')}` : ''].filter(Boolean).join('\n'),
          start: { dateTime: start, timeZone: 'Asia/Tokyo' },
          end: { dateTime: end, timeZone: 'Asia/Tokyo' },
          colorId: colorMap[task.priority] || '8',
        }),
      }
    );

    if (res.ok) {
      const event = await res.json();
      results.push({ taskId: task.id, eventId: event.id });
    }
  }

  return NextResponse.json({ results });
}
