import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Hitung nilai per history: (jawaban_benar / total_soal) * 100
const calculateScore = (
  correctAnswers: number,
  totalQuestions: number
): number => {
  const score = (correctAnswers / totalQuestions) * 100;
  return Number(score.toFixed(2)); // Format ke 2 angka desimal
};

export async function GET() {
  try {
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
          nilaiPerHistory: [] as number[], // Specify type untuk array
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

      // Debug info
      console.log('History:', {
        month,
        jawabanBenar: history.score,
        totalSoal,
        nilai
      });
    });

    // Konversi ke format chart dengan perhitungan rata-rata yang benar
    const chartData = Array.from(monthlyStats.entries())
      .sort((a, b) => {
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'Mei',
          'Jun',
          'Jul',
          'Agu',
          'Sep',
          'Okt',
          'Nov',
          'Des'
        ];
        return months.indexOf(a[0]) - months.indexOf(b[0]);
      })
      .map(([bulan, stats]) => {
        // Hitung rata-rata: jumlah semua nilai dibagi jumlah history
        const rataRata =
          stats.nilaiPerHistory.length > 0
            ? Number(
                (
                  stats.nilaiPerHistory.reduce(
                    (a: number, b: number) => a + b,
                    0
                  ) / stats.nilaiPerHistory.length
                ).toFixed(2)
              )
            : 0;

        // Debug info
        console.log('Bulan:', bulan, {
          nilaiPerHistory: stats.nilaiPerHistory,
          jumlahTryout: stats.jumlahTryout,
          rataRata
        });

        return {
          bulan,
          tryoutSelesai: stats.tryoutSelesai,
          rataRata
        };
      });

    return NextResponse.json({ data: chartData });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
