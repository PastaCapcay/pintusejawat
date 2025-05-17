import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Cache response for 1 minute
export const revalidate = 60;

// GET /api/tryout-history
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
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
          email: session.user.email
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
            name: true,
            description: true
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
