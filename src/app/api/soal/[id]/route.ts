import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Cek apakah user adalah admin
    const adminUser = await prisma.user.findUnique({
      where: { id: user.id }
    });

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const id = (await params).id;

    // Get the soal first to get its paketSoalId
    const soal = await prisma.soal.findUnique({
      where: { id },
      select: { paketSoalId: true }
    });

    if (!soal) {
      return NextResponse.json(
        { error: 'Soal tidak ditemukan' },
        { status: 404 }
      );
    }

    await prisma.soal.delete({
      where: {
        id
      }
    });

    // Revalidate paths
    revalidatePath(`/dashboard/soal/${soal.paketSoalId}`);

    return NextResponse.json({ message: 'Soal berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting soal:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Cek apakah user adalah admin
    const adminUser = await prisma.user.findUnique({
      where: { id: user.id }
    });

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const id = (await params).id;
    const body = await request.json();

    // Get the soal first to get its paketSoalId
    const existingSoal = await prisma.soal.findUnique({
      where: { id },
      select: { paketSoalId: true }
    });

    if (!existingSoal) {
      return NextResponse.json(
        { error: 'Soal tidak ditemukan' },
        { status: 404 }
      );
    }

    const {
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

    const updatedSoal = await prisma.soal.update({
      where: { id },
      data: {
        pertanyaan,
        opsiA,
        opsiB,
        opsiC,
        opsiD,
        opsiE,
        jawabanBenar,
        pembahasan
      }
    });

    // Revalidate paths
    revalidatePath(`/dashboard/soal/${existingSoal.paketSoalId}`);

    return NextResponse.json(updatedSoal);
  } catch (error) {
    console.error('Error updating soal:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const soal = await prisma.soal.findUnique({
      where: {
        id: params.id
      }
    });

    if (!soal) {
      return new NextResponse('Not Found', { status: 404 });
    }

    return NextResponse.json(soal);
  } catch (error) {
    console.error('[SOAL_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
