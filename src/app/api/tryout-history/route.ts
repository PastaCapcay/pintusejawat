import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

// Cache response for 1 minute
export const revalidate = 60;

// GET /api/tryout-history
export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Optimize query by:
    // 1. Only select needed fields
    // 2. Limit to last 30 days
    // 3. Add pagination
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const histories = await prisma.tryoutHistory.findMany({
      where: {
        user: {
          email: user.email
        },
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      select: {
        id: true,
        score: true,
        createdAt: true,
        paketSoal: {
          select: {
            id: true,
            judul: true,
            deskripsi: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10 // Limit to last 10 records
    });

    return NextResponse.json(histories);
  } catch (error) {
    console.error('[TRYOUT_HISTORY_GET]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/tryout-history
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { paketSoalId, score, timeSpent, answers } = body;

    const tryoutHistory = await prisma.tryoutHistory.create({
      data: {
        userId: user.id,
        paketSoalId,
        score,
        timeSpent,
        answers
      }
    });

    return NextResponse.json(tryoutHistory);
  } catch (error) {
    console.error('[TRYOUT_HISTORY_POST]', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
