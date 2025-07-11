import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId, deviceId } = await request.json();
    if (!userId || !deviceId) {
      return NextResponse.json(
        { error: 'userId dan deviceId wajib diisi' },
        { status: 400 }
      );
    }

    // Upsert sesi untuk device ini
    const session = await prisma.userSession.upsert({
      where: {
        userId_deviceId: {
          userId,
          deviceId
        }
      },
      create: {
        userId,
        deviceId,
        isActive: true
      },
      update: {
        isActive: true,
        lastActive: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        deviceId: session.deviceId,
        lastActive: session.lastActive
      }
    });
  } catch (error) {
    console.error('Error user session:', error);
    return NextResponse.json(
      { error: 'Gagal update session' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const deviceId = searchParams.get('deviceId');

    if (!userId || !deviceId) {
      return NextResponse.json(
        { error: 'userId dan deviceId wajib diisi' },
        { status: 400 }
      );
    }

    // Cek sesi untuk device ini
    const session = await prisma.userSession.findUnique({
      where: {
        userId_deviceId: {
          userId,
          deviceId
        }
      }
    });

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: 'Sesi tidak ditemukan'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        deviceId: session.deviceId,
        lastActive: session.lastActive,
        isActive: session.isActive
      }
    });
  } catch (error) {
    console.error('Error get session:', error);
    return NextResponse.json(
      { error: 'Gagal mendapatkan session' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId, deviceId } = await request.json();
    if (!userId || !deviceId) {
      return NextResponse.json(
        { error: 'userId dan deviceId wajib diisi' },
        { status: 400 }
      );
    }

    // Cek dulu apakah sesi ada
    const existingSession = await prisma.userSession.findUnique({
      where: {
        userId_deviceId: {
          userId,
          deviceId
        }
      }
    });

    // Jika sesi tidak ditemukan, anggap sudah logout
    if (!existingSession) {
      return NextResponse.json({
        success: true,
        message: 'Sesi sudah tidak aktif'
      });
    }

    // Nonaktifkan sesi
    const session = await prisma.userSession.update({
      where: {
        userId_deviceId: {
          userId,
          deviceId
        }
      },
      data: {
        isActive: false,
        lastActive: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        deviceId: session.deviceId,
        lastActive: session.lastActive
      }
    });
  } catch (error) {
    console.error('Error saat logout session:', error);
    return NextResponse.json(
      { error: 'Gagal logout session' },
      { status: 500 }
    );
  }
}
