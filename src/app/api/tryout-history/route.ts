import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

// GET /api/tryout-history
export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tryoutHistory = await prisma.tryoutHistory.findMany({
      where: {
        userId: user.id,
        paketSoal: {
          id: {
            not: 'TRYOUT_FREE'
          }
        }
      },
      include: {
        paketSoal: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(tryoutHistory);
  } catch (error) {
    console.error('[TRYOUT_HISTORY_GET]', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// POST /api/tryout-history
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    console.log('Processing tryout history POST request:', {
      userId: user?.id
    });

    if (!user?.id) {
      console.log('Unauthorized: No user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { paketSoalId, score, timeSpent, answers } = body;

    console.log('Creating tryout history with data:', {
      userId: user.id,
      paketSoalId,
      score,
      timeSpent,
      answersCount: Object.keys(answers).length
    });

    const tryoutHistory = await prisma.tryoutHistory.create({
      data: {
        userId: user.id,
        paketSoalId,
        score,
        timeSpent,
        answers
      }
    });

    console.log('Successfully created tryout history:', tryoutHistory.id);
    return NextResponse.json(tryoutHistory);
  } catch (error) {
    console.error('[TRYOUT_HISTORY_POST]', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
