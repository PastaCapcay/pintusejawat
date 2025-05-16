import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

// GET /api/tryout-history/[historyId]
export async function GET(
  request: Request,
  { params }: { params: { historyId: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tryoutHistory = await prisma.tryoutHistory.findUnique({
      where: {
        id: params.historyId,
        userId: user.id // Pastikan user hanya bisa akses history miliknya
      }
    });

    if (!tryoutHistory) {
      return NextResponse.json({ error: 'History not found' }, { status: 404 });
    }

    return NextResponse.json(tryoutHistory);
  } catch (error) {
    console.error('[TRYOUT_HISTORY_GET_BY_ID]', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
