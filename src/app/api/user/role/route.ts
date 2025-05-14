import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ role: null });
    }

    // Cek role user dari Prisma
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { role: true }
    });

    return NextResponse.json({ role: user?.role || null });
  } catch (error) {
    console.error('Error fetching user role:', error);
    return NextResponse.json({ role: null }, { status: 500 });
  }
}
