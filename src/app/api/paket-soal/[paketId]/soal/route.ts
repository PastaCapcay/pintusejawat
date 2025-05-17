import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Cache response for 5 minutes
export const revalidate = 300;

export async function GET(
  request: Request,
  { params }: { params: { paketId: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { paketId } = params;

    // Optimasi query dengan select yang lebih spesifik
    const paket = await prisma.paketSoal.findUnique({
      where: { id: paketId },
      select: {
        id: true,
        judul: true,
        deskripsi: true,
        soal: {
          select: {
            id: true,
            pertanyaan: true,
            opsiA: true,
            opsiB: true,
            opsiC: true,
            opsiD: true,
            opsiE: true,
            jawabanBenar: true,
            pembahasan: true
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });

    if (!paket) {
      return NextResponse.json(
        { error: 'Paket soal tidak ditemukan' },
        { status: 404 }
      );
    }

    // Transform data untuk response
    const response = {
      id: paket.id,
      judul: paket.judul,
      deskripsi: paket.deskripsi,
      durasi: paket.soal.length, // 1 menit per soal
      soal: paket.soal.map((s) => ({
        id: s.id,
        pertanyaan: s.pertanyaan,
        opsi: {
          A: s.opsiA,
          B: s.opsiB,
          C: s.opsiC,
          D: s.opsiD,
          E: s.opsiE
        },
        jawabanBenar: s.jawabanBenar,
        pembahasan: s.pembahasan
      }))
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=59'
      }
    });
  } catch (error) {
    console.error('[PAKET_SOAL_GET]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
