import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const calculateScore = (
  correctAnswers: number,
  totalQuestions: number
): number => {
  const score = (correctAnswers / totalQuestions) * 100;
  return Number(score.toFixed(2));
};

export async function GET() {
  try {
    // Total Pengguna
    const totalUsers = await prisma.user.count();
    console.log('Total Users:', totalUsers);

    // Hitung total pengguna bulan lalu
    const today = new Date();
    const firstDayThisMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    const totalUsersLastMonth = await prisma.user.count({
      where: {
        createdAt: {
          lt: firstDayThisMonth
        }
      }
    });
    console.log('Total Users Last Month:', totalUsersLastMonth);

    // Hitung persentase perubahan
    const percentageChange =
      totalUsersLastMonth > 0
        ? Number(
            (
              ((totalUsers - totalUsersLastMonth) / totalUsersLastMonth) *
              100
            ).toFixed(1)
          )
        : 0;
    console.log('Percentage Change:', percentageChange);

    // Total Tryout (PaketSoal)
    const totalTryout = await prisma.paketSoal.count();

    // Total Soal dari Bank Soal
    const totalSoalTersedia = await prisma.soal.count();

    // Total Materi
    const totalMateri = await prisma.materi.count();

    // Rata-rata Nilai dari semua history
    const tryoutHistories = await prisma.tryoutHistory.findMany({
      include: {
        paketSoal: {
          include: {
            soal: true
          }
        }
      }
    });

    let totalNilai = 0;
    tryoutHistories.forEach((history) => {
      const nilai = calculateScore(
        history.score,
        history.paketSoal.soal.length
      );
      totalNilai += nilai;
    });
    const averageScore =
      tryoutHistories.length > 0
        ? Number((totalNilai / tryoutHistories.length).toFixed(2))
        : 0;

    // Aktivitas Tryout Terbaru (5 terakhir)
    const recentActivities = await prisma.tryoutHistory.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        paketSoal: {
          select: {
            judul: true,
            soal: true
          }
        }
      }
    });

    const formattedActivities = recentActivities.map((activity) => ({
      id: activity.id,
      userName: activity.user.name,
      userEmail: activity.user.email,
      tryoutName: activity.paketSoal.judul,
      score: calculateScore(activity.score, activity.paketSoal.soal.length),
      date: activity.createdAt
    }));

    // Pertumbuhan Pengguna per bulan (6 bulan terakhir)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const userGrowth = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: sixMonthsAgo
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    const monthlyGrowth = userGrowth.reduce(
      (acc, user) => {
        const month = user.createdAt.toLocaleString('id-ID', {
          month: 'short'
        });
        if (!acc[month]) {
          acc[month] = { total: 0 };
        }
        acc[month].total += 1;
        return acc;
      },
      {} as Record<string, { total: number }>
    );

    // Distribusi Nilai
    const nilaiDistribution = {
      'A (90-100)': 0,
      'B (80-89)': 0,
      'C (70-79)': 0,
      'D (60-69)': 0,
      'E (<60)': 0
    };

    tryoutHistories.forEach((history) => {
      const nilai = calculateScore(
        history.score,
        history.paketSoal.soal.length
      );
      if (nilai >= 90) nilaiDistribution['A (90-100)']++;
      else if (nilai >= 80) nilaiDistribution['B (80-89)']++;
      else if (nilai >= 70) nilaiDistribution['C (70-79)']++;
      else if (nilai >= 60) nilaiDistribution['D (60-69)']++;
      else nilaiDistribution['E (<60)']++;
    });

    return NextResponse.json({
      stats: {
        totalUsers,
        percentageChange,
        totalTryout,
        totalMateri,
        averageScore,
        totalSoalTersedia
      },
      recentActivities: formattedActivities,
      userGrowth: monthlyGrowth,
      nilaiDistribution
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
