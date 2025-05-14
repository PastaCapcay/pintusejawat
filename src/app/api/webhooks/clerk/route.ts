import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

type WebhookHeaders = {
  'svix-id': string;
  'svix-timestamp': string;
  'svix-signature': string;
};

type UserUpdateData = Prisma.UserUncheckedUpdateInput;

export async function POST(request: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET');
  }

  // Get the headers
  const svix_id = request.headers.get('svix-id');
  const svix_timestamp = request.headers.get('svix-timestamp');
  const svix_signature = request.headers.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Missing headers', { status: 400 });
  }

  const svix_headers = {
    'svix-id': svix_id,
    'svix-timestamp': svix_timestamp,
    'svix-signature': svix_signature
  };

  let payload;
  try {
    payload = await request.json();
  } catch (err) {
    console.error('Error parsing request body:', err);
    return new NextResponse('Error parsing request body', { status: 400 });
  }

  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, svix_headers) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error verifying webhook', { status: 400 });
  }

  const eventType = evt.type;
  console.log(`Webhook event received: ${eventType}`, evt.data);

  try {
    switch (eventType) {
      case 'session.created': {
        // Pastikan data yang diperlukan ada
        const sessionId = evt.data.id;
        const userId = evt.data.user_id;

        if (!sessionId || !userId) {
          console.error('Missing session data:', evt.data);
          return new NextResponse('Missing session data', { status: 400 });
        }

        console.log(
          `[SESSION_CREATED] Processing for user ${userId} with session ${sessionId}`
        );

        try {
          // Cek apakah user ada di database
          const existingUser = await prisma.user.findUnique({
            where: { clerkId: userId }
          });

          if (!existingUser) {
            console.error(
              `[SESSION_CREATED] User ${userId} not found in database`
            );
            return new NextResponse('User not found', { status: 404 });
          }

          console.log(`[SESSION_CREATED] Current user state:`, existingUser);

          // Jika ada session aktif yang berbeda, revoke session lama via Clerk API
          if (
            existingUser.activeSessionId &&
            existingUser.activeSessionId !== sessionId
          ) {
            try {
              const revokeResponse = await fetch(
                `https://api.clerk.com/v1/sessions/${existingUser.activeSessionId}/revoke`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${CLERK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                  }
                }
              );

              if (revokeResponse.ok) {
                console.log(
                  `[SESSION_CREATED] Successfully revoked old session: ${existingUser.activeSessionId}`
                );
              } else {
                console.error(
                  '[SESSION_CREATED] Failed to revoke old session:',
                  await revokeResponse.text()
                );
              }
            } catch (error) {
              console.error(
                '[SESSION_CREATED] Error revoking old session:',
                error
              );
            }
          }

          // Update user dengan session baru
          const updateData = {
            activeSessionId: sessionId,
            lastLoginAt: new Date()
          };

          const updatedUser = await prisma.user.update({
            where: { clerkId: userId },
            data: updateData
          });

          console.log(
            '[SESSION_CREATED] User updated successfully:',
            updatedUser
          );
          return new NextResponse('Session created and user updated', {
            status: 200
          });
        } catch (error) {
          console.error('[SESSION_CREATED] Error updating user:', error);
          return new NextResponse('Error updating user', { status: 500 });
        }
      }

      case 'session.removed': {
        const sessionId = evt.data.id;
        const userId = evt.data.user_id;

        if (!sessionId || !userId) {
          console.error('[SESSION_REMOVED] Missing session data:', evt.data);
          return new NextResponse('Missing session data', { status: 400 });
        }

        console.log(
          `[SESSION_REMOVED] Processing for user ${userId} with session ${sessionId}`
        );

        try {
          // Cek user dan session yang aktif
          const existingUser = await prisma.user.findUnique({
            where: { clerkId: userId }
          });

          if (!existingUser) {
            console.error(
              `[SESSION_REMOVED] User ${userId} not found in database`
            );
            return new NextResponse('User not found', { status: 404 });
          }

          console.log(`[SESSION_REMOVED] Current user state:`, existingUser);

          // Hanya hapus session jika ini adalah session aktif
          if (existingUser.activeSessionId === sessionId) {
            const updateData: UserUpdateData = {
              activeSessionId: null
            };

            const updatedUser = await prisma.user.update({
              where: { clerkId: userId },
              data: updateData
            });

            console.log(
              '[SESSION_REMOVED] Active session removed successfully:',
              updatedUser
            );
          } else {
            console.log(
              '[SESSION_REMOVED] Session ID does not match active session, no update needed'
            );
          }

          return new NextResponse('Session processed', { status: 200 });
        } catch (error) {
          console.error('[SESSION_REMOVED] Error processing session:', error);
          return new NextResponse('Error processing session', { status: 500 });
        }
      }

      case 'user.created': {
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
          return new NextResponse('Error creating/updating user', {
            status: 500
          });
        }
      }

      case 'user.updated': {
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
          return new NextResponse('Error updating user', { status: 500 });
        }
      }

      case 'user.deleted': {
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

      default:
        console.log(`Unhandled event type: ${eventType}`);
        return new NextResponse('Unhandled event type', { status: 400 });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Webhook processing failed', { status: 500 });
  }
}

export const GET = POST;
export const PUT = POST;
