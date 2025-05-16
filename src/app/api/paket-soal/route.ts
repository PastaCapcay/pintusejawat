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

    // Cek apakah user adalah admin
    const adminUser = await prisma.user.findUnique({
      where: { id: user.id }
    });

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return new NextResponse('Forbidden', { status: 403 });
    }

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
  }
}
