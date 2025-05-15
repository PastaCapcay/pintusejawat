import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { google } from 'googleapis';
import { Readable } from 'stream';
import { getVercelOidcToken } from '@vercel/functions/oidc';
import { OAuth2Client } from 'google-auth-library';

const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID;
const GCP_PROJECT_NUMBER = process.env.GCP_PROJECT_NUMBER;
const GCP_SERVICE_ACCOUNT_EMAIL = process.env.GCP_SERVICE_ACCOUNT_EMAIL;
const GCP_WORKLOAD_IDENTITY_POOL_ID = process.env.GCP_WORKLOAD_IDENTITY_POOL_ID;
const GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID =
  process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID;

// Inisialisasi Google Drive API dengan OIDC
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const FOLDER_ID = '1uPLkQK87kznpM5Cm1980WtuuzD6XUh_2';

// Inisialisasi auth client dengan OIDC
const authClient = new OAuth2Client();
authClient.getAccessToken = async () => {
  const token = await getVercelOidcToken();
  return {
    token: token,
    res: null
  };
};

const drive = google.drive({
  version: 'v3',
  auth: authClient
});

// Fungsi untuk mengirim pesan WhatsApp
async function sendWhatsAppNotification(data: {
  email: string;
  whatsapp: string;
  packageId: string;
  proofUrl: string;
}) {
  const waNumber = '62895391166633';
  const message = `*Notifikasi Pembayaran Upgrade Paket*\n\nEmail: ${data.email}\nNo WA: ${data.whatsapp}\nPaket: ${data.packageId}\nBukti Pembayaran: ${data.proofUrl}`;

  const waUrl = `https://web.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`;
  return waUrl;
}

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validasi environment variables
    if (
      !GCP_PROJECT_ID ||
      !GCP_PROJECT_NUMBER ||
      !GCP_SERVICE_ACCOUNT_EMAIL ||
      !GCP_WORKLOAD_IDENTITY_POOL_ID ||
      !GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID
    ) {
      console.error('Missing required GCP environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const email = formData.get('email') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const packageId = formData.get('packageId') as string;
    const paymentProof = formData.get('paymentProof') as File;

    if (!email || !whatsapp || !packageId || !paymentProof) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    // Validasi tipe file
    if (!paymentProof.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File harus berupa gambar' },
        { status: 400 }
      );
    }

    // Validasi ukuran file (max 5MB)
    if (paymentProof.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Ukuran file maksimal 5MB' },
        { status: 400 }
      );
    }

    // Baca file sebagai buffer
    const arrayBuffer = await paymentProof.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload ke Google Drive
    const fileMetadata = {
      name: `bukti_pembayaran_${userId}_${new Date().getTime()}.${paymentProof.name.split('.').pop()}`,
      parents: [FOLDER_ID]
    };

    const media = {
      mimeType: paymentProof.type,
      body: Readable.from(buffer)
    };

    const driveResponse = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id,webViewLink'
    });

    // Set file agar bisa diakses public
    await drive.permissions.create({
      fileId: driveResponse.data.id as string,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    });

    // Generate pesan WhatsApp
    const waNumber = '+62895391166633';
    const message = `*Notifikasi Pembayaran Upgrade Paket*\n\nEmail: ${email}\nNo WA: ${whatsapp}\nPaket: ${packageId}\nBukti Pembayaran: ${driveResponse.data.webViewLink}`;
    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber.replace('+', '')}&text=${encodeURIComponent(message)}`;

    return NextResponse.json({
      success: true,
      message: 'Bukti pembayaran berhasil dikirim',
      data: {
        waUrl
      }
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function getPackagePrice(packageId: string): number {
  const prices = {
    starter: 199000,
    pro: 349000,
    'pro-plus': 599000
  };
  return prices[packageId as keyof typeof prices] || 0;
}
