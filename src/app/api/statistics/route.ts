import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateScore } from '@/lib/utils';
import { headers } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Cache response for 5 minutes
export const revalidate = 300;

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const headersList = headers();
    const forceRefresh = headersList.get('x-force-refresh') === 'true';

    // Mendapatkan data 6 bulan terakhir
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Optimasi query dengan select yang lebih spesifik
    const tryoutHistories = await prisma.tryoutHistory.findMany({
      where: {
        user: {
          email: user.email
        },
        createdAt: {
          gte: sixMonthsAgo
        }
      },
      select: {
        createdAt: true,
        score: true,
        paketSoal: {
          select: {
            soal: {
              select: {
                id: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    // Mengelompokkan data per bulan dengan Map untuk performa lebih baik
    const monthlyStats = new Map();

    for (const history of tryoutHistories) {
      const month = history.createdAt.toLocaleString('id-ID', {
        month: 'short'
      });

      if (!monthlyStats.has(month)) {
        monthlyStats.set(month, {
          tryoutSelesai: 0,
          nilaiPerHistory: [],
          jumlahTryout: 0,
          totalNilai: 0
        });
      }

      const stats = monthlyStats.get(month);
      stats.tryoutSelesai += 1;

      // Hitung nilai
      const totalSoal = history.paketSoal.soal.length;
      const nilai = calculateScore(history.score, totalSoal);

      stats.nilaiPerHistory.push(nilai);
      stats.jumlahTryout += 1;
      stats.totalNilai += nilai;
    }

    // Transform data untuk response
    const response = Array.from(monthlyStats.entries()).map(
      ([month, stats]) => ({
        month,
        tryoutSelesai: stats.tryoutSelesai,
        nilaiRataRata: Math.round(stats.totalNilai / stats.tryoutSelesai),
        jumlahTryout: stats.jumlahTryout
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
