import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);

    const { id, email, name } = body;

    // Cek apakah user sudah ada
    console.log('Checking for existing user with email:', email);
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    console.log('Existing user:', existingUser);

    if (existingUser) {
      console.log('User already exists with email:', email);
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    // Buat user baru dengan role dan grade default
    console.log('Creating new user with data:', {
      id,
      email,
      name,
      role: 'USER',
      grade: 'FREE'
    });

    const user = await prisma.user.create({
      data: {
        id,
        email,
        name,
        role: 'USER',
        grade: 'FREE'
      }
    });

    console.log('User created successfully:', user);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in POST /api/user:', error);
    return NextResponse.json({ error: 'Gagal membuat user' }, { status: 500 });
  }
}

// Endpoint untuk menghapus user jika signup di Supabase gagal
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus user' },
      { status: 500 }
    );
  }
}

// Endpoint untuk mengambil semua user
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        grade: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data user' },
      { status: 500 }
    );
  }
}
