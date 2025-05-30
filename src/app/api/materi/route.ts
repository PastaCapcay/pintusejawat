import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.id) {
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
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.id) {
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

export async function DELETE(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID materi wajib diisi' },
        { status: 400 }
      );
    }

    await prisma.materi.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting materi:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { id, nama, deskripsi, jenis, link } = body;

    if (!id || !nama || !jenis || !link) {
      return NextResponse.json(
        { error: 'ID, nama, jenis, dan link wajib diisi' },
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

    return NextResponse.json(materi);
  } catch (error) {
    console.error('Error updating materi:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
