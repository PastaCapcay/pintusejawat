import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateScore } from '@/lib/utils';
import { headers } from 'next/headers';

// Cache response for 5 minutes
export const revalidate = 300;

export async function GET() {
  try {
    const headersList = headers();
    const forceRefresh = headersList.get('x-force-refresh') === 'true';

    // Mendapatkan data 6 bulan terakhir
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Mengambil semua tryout history dalam 6 bulan terakhir dengan paket soal dan soal-soalnya
    const tryoutHistories = await prisma.tryoutHistory.findMany({
      where: {
        createdAt: {
          gte: sixMonthsAgo
        }
      },
      include: {
        paketSoal: {
          include: {
            soal: true // Ambil semua soal untuk mendapatkan jumlah total
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    // Mengelompokkan data per bulan
    const monthlyStats = new Map();

    tryoutHistories.forEach((history: any) => {
      const month = history.createdAt.toLocaleString('id-ID', {
        month: 'short'
      });

      if (!monthlyStats.has(month)) {
        monthlyStats.set(month, {
          tryoutSelesai: 0,
          nilaiPerHistory: [] as number[],
          jumlahTryout: 0
        });
      }

      const stats = monthlyStats.get(month);
      stats.tryoutSelesai += 1;

      // Hitung nilai: (jawaban_benar / total_soal) * 100
      const totalSoal = history.paketSoal.soal.length;
      const nilai = calculateScore(history.score, totalSoal);

      // Simpan nilai history ini
      stats.nilaiPerHistory.push(nilai);
      stats.jumlahTryout += 1;
    });

    // Convert Map to array for response
    const response = Array.from(monthlyStats.entries()).map(
      ([month, stats]) => ({
        month,
        ...stats
      })
    );

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=59'
      }
    });
  } catch (error) {
    console.error('[STATISTICS_GET]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
