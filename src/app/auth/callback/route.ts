import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session }
    } = await supabase.auth.exchangeCodeForSession(code);

    if (session?.access_token) {
      // Simpan sesi aktif
      console.log('Saving session after OAuth callback...');
      const response = await fetch(`${requestUrl.origin}/api/auth/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error(
          'Failed to save session after OAuth callback:',
          await response.json()
        );
      } else {
        console.log('Session saved successfully after OAuth callback');
      }
    }
  }

  return NextResponse.redirect(new URL('/dashboarduser', request.url));
}
