import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// GET /api/tryout-history
export async function GET() {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUserId }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
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
    const { userId: clerkUserId } = await auth();

    console.log('Processing tryout history POST request:', { clerkUserId });

    if (!clerkUserId) {
      console.log('Unauthorized: No clerkUserId found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUserId }
    });

    if (!user) {
      console.log('User not found for clerkId:', clerkUserId);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
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
