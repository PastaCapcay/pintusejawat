import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function GET(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  try {
    const { userId: clerkUserId } = await auth();
    const { userId } = context.params;

    if (!clerkUserId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Cek apakah user adalah admin
    const adminUser = await prisma.user.findUnique({
      where: { clerkId: clerkUserId }
    });

    if (!adminUser || adminUser.role !== Role.ADMIN) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Ambil data user
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('[USER_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  try {
    const { userId: clerkUserId } = await auth();
    const body = await req.json();

    const { role, grade } = body;
    const { userId } = context.params;

    console.log('Update user request:', {
      userId,
      role,
      grade,
      clerkUserId
    });

    if (!clerkUserId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Cek apakah user adalah admin
    const adminUser = await prisma.user.findUnique({
      where: { clerkId: clerkUserId }
    });

    console.log('Admin user:', adminUser);

    if (!adminUser || adminUser.role !== Role.ADMIN) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Cek apakah user yang akan diupdate ada
    const userToUpdate = await prisma.user.findUnique({
      where: { id: userId }
    });

    console.log('User to update:', userToUpdate);

    if (!userToUpdate) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Update user di database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role, grade }
    });

    console.log('Updated user:', updatedUser);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('[USER_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
