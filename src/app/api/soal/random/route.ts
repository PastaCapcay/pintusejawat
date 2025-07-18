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

    // Ambil semua soal dari database yang hanya milik paket TRYOUT_FREE
    const allSoals = await prisma.soal.findMany({
      where: { paketSoalId: TRYOUT_FREE },
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

    // Ambil semua soal (tanpa pembatasan 10 soal)
    const selectedSoals = shuffledSoals;

    // Kirim semua field soal, termasuk jawabanBenar, agar frontend bisa menghitung skor dengan benar
    // (Frontend tidak akan merender jawabanBenar ke UI)
    console.log(
      `[TRYOUT_FREE] Sending ${selectedSoals.length} random questions (with kunci jawaban for scoring only)`
    );

    return NextResponse.json(selectedSoals);
  } catch (error) {
    console.error('Error fetching random soal:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
