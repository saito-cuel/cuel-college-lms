import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

async function getAccessToken(): Promise<string | null> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('google_access_token')?.value;
  if (accessToken) return accessToken;

  const refreshToken = cookieStore.get('google_refresh_token')?.value;
  if (!refreshToken) return null;

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: refreshToken, client_id: clientId,
        client_secret: clientSecret, grant_type: 'refresh_token',
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token || null;
  } catch {
    return null;
  }
}

export async function GET() {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json(
      { error: 'unauthorized', message: 'Googleカレンダーと連携してください' },
      { status: 401 }
    );
  }

  const now = new Date();
  const twoWeeksLater = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    timeMin: now.toISOString(), timeMax: twoWeeksLater.toISOString(),
    singleEvents: 'true', orderBy: 'startTime', maxResults: '30',
  });

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: res.status === 401 ? 'unauthorized' : 'カレンダーの取得に失敗しました' },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json({ events: data.items || [] });
}

export async function POST(request: NextRequest) {
  const accessToken = await getAccessToken();
  if (!accessToken) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const { summary, description, start, end, colorId } = await request.json();

  const res = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        summary, description,
        start: { dateTime: start, timeZone: 'Asia/Tokyo' },
        end: { dateTime: end, timeZone: 'Asia/Tokyo' },
        ...(colorId ? { colorId } : {}),
      }),
    }
  );

  if (!res.ok) return NextResponse.json({ error: 'イベントの作成に失敗しました' }, { status: 500 });
  const event = await res.json();
  return NextResponse.json({ event });
}
