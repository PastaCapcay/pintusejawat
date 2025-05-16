import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import * as XLSX from 'xlsx';
import { convertGDriveLink } from '@/lib/utils';

interface XLSXRecord {
  pertanyaan: string;
  opsiA: string;
  opsiB: string;
  opsiC: string;
  opsiD: string;
  opsiE: string;
  jawabanBenar: string;
  pembahasan?: string;
}

// Fungsi untuk mengekstrak dan mengkonversi link gambar
function processContentWithImage(content: string): string {
  if (!content) return content;

  // Cek apakah ada format pertanyaan(link) - tanpa spasi
  // atau format pertanyaan (link) - dengan spasi
  const matches = content.match(/^(.*?)\s*\((https?:\/\/.*?)\)$/);
  if (matches) {
    const [_, text, imageUrl] = matches;
    const convertedUrl = convertGDriveLink(imageUrl);
    return `${text.trim()}(${convertedUrl})`;
  }

  // Cek apakah konten adalah URL langsung
  if (content.startsWith('http://') || content.startsWith('https://')) {
    return convertGDriveLink(content);
  }

  return content;
}

export async function POST(request: Request) {
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

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const paketSoalId = formData.get('paketSoalId') as string;

    if (!file || !paketSoalId) {
      return NextResponse.json(
        { error: 'File dan paketSoalId wajib diisi' },
        { status: 400 }
      );
    }

    // Baca file sebagai array buffer
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });

    // Ambil sheet pertama
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Konversi ke JSON
    const records = XLSX.utils.sheet_to_json<XLSXRecord>(worksheet);

    if (records.length === 0) {
      return NextResponse.json(
        { error: 'File kosong atau tidak memiliki data yang valid' },
        { status: 400 }
      );
    }

    // Validasi format data
    for (const record of records) {
      if (
        !record.pertanyaan ||
        !record.opsiA ||
        !record.opsiB ||
        !record.opsiC ||
        !record.opsiD ||
        !record.opsiE ||
        !record.jawabanBenar
      ) {
        return NextResponse.json(
          {
            error: 'Format file tidak valid. Pastikan semua kolom wajib terisi.'
          },
          { status: 400 }
        );
      }

      if (
        !['A', 'B', 'C', 'D', 'E'].includes(record.jawabanBenar.toUpperCase())
      ) {
        return NextResponse.json(
          { error: 'Jawaban benar harus berupa A, B, C, D, atau E' },
          { status: 400 }
        );
      }
    }

    // Upload soal ke database dengan konversi link gambar
    const createdSoal = await prisma.$transaction(
      records.map((record: XLSXRecord) =>
        prisma.soal.create({
          data: {
            pertanyaan: processContentWithImage(record.pertanyaan),
            opsiA: processContentWithImage(record.opsiA),
            opsiB: processContentWithImage(record.opsiB),
            opsiC: processContentWithImage(record.opsiC),
            opsiD: processContentWithImage(record.opsiD),
            opsiE: processContentWithImage(record.opsiE),
            jawabanBenar: record.jawabanBenar.toUpperCase(),
            pembahasan: record.pembahasan
              ? processContentWithImage(record.pembahasan)
              : null,
            paketSoalId
          }
        })
      )
    );

    return NextResponse.json({
      message: `${createdSoal.length} soal berhasil diupload`,
      data: createdSoal
    });
  } catch (error) {
    console.error('Error uploading soal:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengupload soal' },
      { status: 500 }
    );
  }
}
