import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const error = request.nextUrl.searchParams.get('error');
  const baseUrl = request.nextUrl.origin;

  if (error || !code) {
    const url = new URL('/dashboard/tasks', baseUrl);
    url.searchParams.set('calendar_error', error || 'no_code');
    return NextResponse.redirect(url);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${baseUrl}/api/calendar/callback`;

  if (!clientId || !clientSecret) {
    const url = new URL('/dashboard/tasks', baseUrl);
    url.searchParams.set('calendar_error', 'not_configured');
    return NextResponse.redirect(url);
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code, client_id: clientId, client_secret: clientSecret,
        redirect_uri: redirectUri, grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) throw new Error('Token exchange failed');
    const tokens = await tokenResponse.json();

    const successUrl = new URL('/dashboard/tasks', baseUrl);
    successUrl.searchParams.set('calendar_connected', '1');
    const response = NextResponse.redirect(successUrl);
    const isProduction = process.env.NODE_ENV === 'production';

    response.cookies.set('google_access_token', tokens.access_token, {
      httpOnly: true, secure: isProduction, sameSite: 'lax',
      maxAge: tokens.expires_in || 3600, path: '/',
    });
    if (tokens.refresh_token) {
      response.cookies.set('google_refresh_token', tokens.refresh_token, {
        httpOnly: true, secure: isProduction, sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, path: '/',
      });
    }
    return response;
  } catch {
    const url = new URL('/dashboard/tasks', baseUrl);
    url.searchParams.set('calendar_error', 'token_exchange_failed');
    return NextResponse.redirect(url);
  }
}
