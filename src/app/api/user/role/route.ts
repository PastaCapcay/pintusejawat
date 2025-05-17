import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// Hapus edge runtime
// export const runtime = 'edge';

export async function GET(request: Request) {
  let userId: string | null = null;

  try {
    const { searchParams } = new URL(request.url);
    userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    console.info('GET /api/user/role - Request:', { userId });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.info('GET /api/user/role - Database response:', user);

    return NextResponse.json(user);
  } catch (error) {
    console.error('GET /api/user/role - Error:', error);

    // Handle specific Prisma errors
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      await prisma.$disconnect();

      // Retry once after disconnecting
      try {
        if (!userId) throw new Error('User ID is required');

        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { role: true }
        });
        return NextResponse.json(user);
      } catch (retryError) {
        console.error('GET /api/user/role - Retry Error:', retryError);
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
