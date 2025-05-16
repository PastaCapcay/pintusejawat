import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { Soal } from '@prisma/client';
import { cookies } from 'next/headers';

const FREE_TRYOUT_QUESTIONS = 10; // Batasi jumlah soal untuk tryout gratis
const TRYOUT_FREE = 'TRYOUT_FREE'; // ID paket tryout gratis

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Cek apakah user sudah pernah mengerjakan tryout gratis
    const tryoutFreeHistory = await prisma.tryoutHistory.findFirst({
      where: {
        userId: user.id,
        paketSoalId: TRYOUT_FREE
      }
    });

    if (tryoutFreeHistory) {
      return NextResponse.json(
        {
          error: 'Anda sudah menggunakan kesempatan tryout gratis',
          alreadyTaken: true
        },
        { status: 403 }
      );
    }

    // Ambil semua soal dari database
    const allSoals = await prisma.soal.findMany({
      select: {
        id: true,
        pertanyaan: true,
        opsiA: true,
        opsiB: true,
        opsiC: true,
        opsiD: true,
        opsiE: true,
        jawabanBenar: true
      }
    });

    // Log jumlah soal yang ditemukan
    console.log(`[TRYOUT_FREE] Found ${allSoals.length} total questions`);

    if (!allSoals.length) {
      return NextResponse.json(
        { error: 'Tidak ada soal yang tersedia untuk tryout gratis saat ini' },
        { status: 404 }
      );
    }

    // Acak urutan soal
    const shuffledSoals = allSoals.sort(() => Math.random() - 0.5);

    // Ambil 10 soal random
    const selectedSoals = shuffledSoals.slice(0, FREE_TRYOUT_QUESTIONS);

    // Hapus jawabanBenar dari response untuk keamanan
    const sanitizedSoals = selectedSoals.map(
      ({ jawabanBenar, ...soal }: { jawabanBenar: string } & Partial<Soal>) =>
        soal
    );

    // Log jumlah soal yang dikirim
    console.log(
      `[TRYOUT_FREE] Sending ${sanitizedSoals.length} random questions`
    );

    return NextResponse.json(sanitizedSoals);
  } catch (error) {
    console.error('Error fetching random soal:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
