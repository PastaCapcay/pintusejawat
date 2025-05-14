import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const materi = await prisma.materi.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(materi);
  } catch (error) {
    console.error('[MATERI_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { nama, deskripsi, jenis, link } = body;

    if (!nama || !jenis || !link) {
      return NextResponse.json(
        { error: 'Nama, jenis, dan link wajib diisi' },
        { status: 400 }
      );
    }

    const materi = await prisma.materi.create({
      data: {
        nama,
        deskripsi,
        jenis,
        link
      }
    });

    return NextResponse.json(materi);
  } catch (error) {
    console.error('Error creating materi:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
