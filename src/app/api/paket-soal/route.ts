import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const paketSoal = await prisma.paketSoal.findMany({
      where: {
        id: {
          not: 'TRYOUT_FREE'
        }
      },
      include: {
        soal: true
      }
    });

    return NextResponse.json(paketSoal || []);
  } catch (error) {
    console.error('Error fetching paket soal:', error);
    return NextResponse.json([]);
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { judul, deskripsi } = body;

    if (!judul) {
      return NextResponse.json(
        { error: 'Judul paket soal harus diisi' },
        { status: 400 }
      );
    }

    const paketSoal = await prisma.paketSoal.create({
      data: {
        judul,
        deskripsi
      }
    });

    return NextResponse.json(paketSoal);
  } catch (error) {
    console.error('Error creating paket soal:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
