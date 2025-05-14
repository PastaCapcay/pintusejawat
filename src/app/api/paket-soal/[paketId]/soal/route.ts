import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(
  request: Request,
  { params }: { params: { paketId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { paketId } = params;

    const paket = await prisma.paketSoal.findUnique({
      where: { id: paketId },
      include: {
        soal: true
      }
    });

    if (!paket) {
      return NextResponse.json(
        { error: 'Paket soal tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      durasi: paket.soal.length, // 1 menit per soal
      soal: paket.soal
    });
  } catch (error) {
    console.error('Error fetching soal:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
