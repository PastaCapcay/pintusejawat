import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// GET /api/tryout-history/[historyId]
export async function GET(
  request: Request,
  { params }: { params: { historyId: string } }
) {
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
