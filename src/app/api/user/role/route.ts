import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Hapus edge runtime
// export const runtime = 'edge';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    console.log('GET /api/user/role - Request:', { userId });

    if (!userId) {
      console.error('GET /api/user/role - Error: User ID is required');
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Gunakan findUnique untuk query yang lebih efisien
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    console.log('GET /api/user/role - Database response:', user);

    if (!user) {
      console.error('GET /api/user/role - Error: User not found', { userId });
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ role: user.role });
  } catch (error) {
    console.error('GET /api/user/role - Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
