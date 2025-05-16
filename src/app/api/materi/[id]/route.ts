import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

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

    const id = (await params).id;
    const materi = await prisma.materi.findUnique({
      where: {
        id
      }
    });

    if (!materi) {
      return new NextResponse('Not Found', { status: 404 });
    }

    return NextResponse.json(materi);
  } catch (error) {
    console.error('[MATERI_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
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

    const { nama, deskripsi, jenis, link } = body;

    if (!nama || !jenis || !link) {
      return NextResponse.json(
        { error: 'Nama, jenis, dan link wajib diisi' },
        { status: 400 }
      );
    }

    const materi = await prisma.materi.update({
      where: { id },
      data: {
        nama,
        deskripsi,
        jenis,
        link
      }
    });

    // Revalidate paths
    revalidatePath('/dashboard/materi');

    return NextResponse.json(materi);
  } catch (error) {
    console.error('Error updating materi:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

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

    await prisma.materi.delete({
      where: { id }
    });

    // Revalidate paths
    revalidatePath('/dashboard/materi');

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('Error deleting materi:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
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
    const { nama, deskripsi, jenis, link } = body;

    if (!nama || !jenis || !link) {
      return NextResponse.json(
        { error: 'Nama, jenis, dan link wajib diisi' },
        { status: 400 }
      );
    }

    const materi = await prisma.materi.update({
      where: { id },
      data: {
        nama,
        deskripsi,
        jenis,
        link
      }
    });

    // Revalidate paths
    revalidatePath('/dashboard/materi');

    return NextResponse.json(materi);
  } catch (error) {
    console.error('Error updating materi:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
