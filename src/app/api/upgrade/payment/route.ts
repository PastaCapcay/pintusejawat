import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { google } from 'googleapis';
import { Readable } from 'stream';
import path from 'path';
import serviceAccount from '../../../service-account.json';

// Inisialisasi Google Drive API
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const FOLDER_ID = '1uPLkQK87kznpM5Cm1980WtuuzD6XUh_2'; // Ganti dengan ID folder Google Drive

const auth2Client = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: SCOPES
});

const drive = google.drive({ version: 'v3', auth: auth2Client });

// Fungsi untuk mengirim pesan WhatsApp
async function sendWhatsAppNotification(data: {
  email: string;
  whatsapp: string;
  packageId: string;
  proofUrl: string;
}) {
  const waNumber = '62895391166633'; // Nomor WA admin (sudah dalam format 62)
  const message = `*Notifikasi Pembayaran Upgrade Paket*\n\nEmail: ${data.email}\nNo WA: ${data.whatsapp}\nPaket: ${data.packageId}\nBukti Pembayaran: ${data.proofUrl}`;

  // Format URL untuk web.whatsapp.com (akan diubah ke whatsapp:// di client untuk mobile)
  const waUrl = `https://web.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`;
  return waUrl;
}

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
