import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Webhook secret dari Supabase untuk verifikasi
const WEBHOOK_SECRET = process.env.SUPABASE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  try {
    // Verifikasi webhook signature
    const headersList = headers();
    const signature = headersList.get('x-signature');

    if (!WEBHOOK_SECRET || signature !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await request.json();

    // Handle different event types
    const eventType = payload.type;

    if (eventType === 'auth.user.created') {
      const { id, email, raw_user_meta_data } = payload.record;

      // Cek apakah user sudah ada
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return NextResponse.json(existingUser);
      }

      // Buat user baru di database
      const user = await prisma.user.create({
        data: {
          id,
          email,
          name: raw_user_meta_data?.name || email.split('@')[0],
          role: 'USER',
          grade: 'FREE'
        }
      });

      return NextResponse.json(user);
    }

    return NextResponse.json({ message: 'Event tidak dihandle' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
