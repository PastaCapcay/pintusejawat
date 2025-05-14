import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

type WebhookHeaders = {
  'svix-id': string;
  'svix-timestamp': string;
  'svix-signature': string;
};

export async function POST(request: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Get the headers
  const svix_id = request.headers.get('svix-id');
  const svix_timestamp = request.headers.get('svix-timestamp');
  const svix_signature = request.headers.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Missing headers', {
      status: 400
    });
  }

  const svix_headers: WebhookHeaders = {
    'svix-id': svix_id,
    'svix-timestamp': svix_timestamp,
    'svix-signature': svix_signature
  };

  // Get the body
  let payload;
  try {
    payload = await request.json();
  } catch (err) {
    console.error('Error parsing request body:', err);
    return new NextResponse('Error parsing request body', { status: 400 });
  }

  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, svix_headers) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error verifying webhook', {
      status: 400
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, ...attributes } = evt.data;

    const primaryEmail = email_addresses[0]?.email_address;

    if (!primaryEmail) {
      return new NextResponse('No email found', { status: 400 });
    }

    try {
      // Gunakan upsert untuk menangani kasus user sudah ada
      await prisma.user.upsert({
        where: { clerkId: id },
        update: {
          email: primaryEmail,
          name:
            `${attributes.first_name || ''} ${attributes.last_name || ''}`.trim() ||
            null
        },
        create: {
          clerkId: id,
          email: primaryEmail,
          name:
            `${attributes.first_name || ''} ${attributes.last_name || ''}`.trim() ||
            null
        }
      });

      return new NextResponse('User created/updated', { status: 200 });
    } catch (error) {
      console.error('[USER_UPSERT]', error);
      return new NextResponse('Error creating/updating user', { status: 500 });
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, ...attributes } = evt.data;

    const primaryEmail = email_addresses[0]?.email_address;

    if (!primaryEmail) {
      return new NextResponse('No email found', { status: 400 });
    }

    try {
      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: primaryEmail,
          name:
            `${attributes.first_name || ''} ${attributes.last_name || ''}`.trim() ||
            null
        }
      });

      return new NextResponse('User updated', { status: 200 });
    } catch (error) {
      console.error('[USER_UPDATE]', error);
      if ((error as any)?.code === 'P2025') {
        return new NextResponse('User not found', { status: 404 });
      }
      return new NextResponse('Error updating user', { status: 500 });
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    try {
      await prisma.user.delete({
        where: { clerkId: id }
      });
      return new NextResponse('User deleted', { status: 200 });
    } catch (error) {
      // Jika user sudah tidak ada di database, anggap berhasil
      if ((error as any)?.code === 'P2025') {
        return new NextResponse('User already deleted', { status: 200 });
      }
      console.error('[USER_DELETE]', error);
      return new NextResponse('Error deleting user', { status: 500 });
    }
  }

  return new NextResponse('Webhook received', { status: 200 });
}

export const GET = POST;
export const PUT = POST;
