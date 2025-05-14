import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const paketId = searchParams.get('paketId');

    if (!paketId) {
      return NextResponse.json(
        { error: 'paketId is required' },
        { status: 400 }
      );
    }

    const soal = await prisma.soal.findMany({
      where: {
        paketSoalId: paketId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(soal);
  } catch (error) {
    console.error('[SOAL_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const {
      paketId,
      pertanyaan,
      opsiA,
      opsiB,
      opsiC,
      opsiD,
      opsiE,
      jawabanBenar,
      pembahasan
    } = body;

    if (
      !paketId ||
      !pertanyaan ||
      !opsiA ||
      !opsiB ||
      !opsiC ||
      !opsiD ||
      !opsiE ||
      !jawabanBenar
    ) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi kecuali pembahasan' },
        { status: 400 }
      );
    }

    // Validasi jawaban benar
    if (!['A', 'B', 'C', 'D', 'E'].includes(jawabanBenar.toUpperCase())) {
      return NextResponse.json(
        { error: 'Jawaban benar harus berupa A, B, C, D, atau E' },
        { status: 400 }
      );
    }

    const soal = await prisma.soal.create({
      data: {
        paketSoalId: paketId,
        pertanyaan,
        opsiA,
        opsiB,
        opsiC,
        opsiD,
        opsiE,
        jawabanBenar: jawabanBenar.toUpperCase(),
        pembahasan
      }
    });

    // Revalidate paths
    revalidatePath(`/dashboard/soal/${paketId}`);

    return NextResponse.json(soal);
  } catch (error) {
    console.error('Error creating soal:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
