import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { paketId: string } }
) {
  try {
    const { paketId } = await params;
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

    return NextResponse.json(paket);
  } catch (error) {
    console.error('Error fetching paket soal:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { paketId: string } }
) {
  try {
    const { paketId } = await params;
    const body = await request.json();
    const { judul, deskripsi } = body;

    if (!judul) {
      return NextResponse.json(
        { error: 'Judul paket soal harus diisi' },
        { status: 400 }
      );
    }

    const paketSoal = await prisma.paketSoal.update({
      where: { id: paketId },
      data: {
        judul,
        deskripsi
      }
    });

    // Revalidate paths
    revalidatePath('/dashboard/soal');
    revalidatePath(`/dashboard/soal/${paketId}`);

    return NextResponse.json(paketSoal);
  } catch (error) {
    console.error('Error updating paket soal:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { paketId: string } }
) {
  try {
    const { paketId } = params;

    // Hapus semua tryout history yang terkait dengan paket soal ini
    await prisma.tryoutHistory.deleteMany({
      where: {
        paketSoalId: paketId
      }
    });

    // Setelah itu baru hapus paket soal
    const deletedPaketSoal = await prisma.paketSoal.delete({
      where: {
        id: paketId
      }
    });

    // Revalidate paths
    revalidatePath('/dashboard/soal');
    revalidatePath(`/dashboard/soal/${paketId}`);

    return NextResponse.json(deletedPaketSoal);
  } catch (error) {
    console.error('Error deleting paket soal:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
