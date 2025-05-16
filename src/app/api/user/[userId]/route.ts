import { NextResponse, NextRequest } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';
import { cookies } from 'next/headers';

export async function GET(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Cek apakah user adalah admin
    const adminUser = await prisma.user.findUnique({
      where: { id: user.id }
    });

    if (!adminUser || adminUser.role !== Role.ADMIN) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Ambil data user
    const targetUser = await prisma.user.findUnique({
      where: { id: context.params.userId }
    });

    if (!targetUser) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json(targetUser);
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
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();
    const body = await req.json();

    const { role, grade } = body;
    const { userId } = context.params;

    console.log('Update user request:', {
      userId,
      role,
      grade,
      requestingUserId: user?.id
    });

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Cek apakah user adalah admin
    const adminUser = await prisma.user.findUnique({
      where: { id: user.id }
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

    // Update user di Prisma
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role, grade }
    });

    console.log('Updated user in Prisma:', updatedUser);

    // Update user di Supabase
    const { error: supabaseError } = await supabase
      .from('user')
      .update({ role })
      .eq('id', userId);

    if (supabaseError) {
      console.error('Error updating user in Supabase:', supabaseError);
      // Tidak perlu throw error, karena update di Prisma sudah berhasil
    } else {
      console.log('User updated in Supabase successfully');
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('[USER_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
