import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import * as XLSX from 'xlsx';

interface XLSXRecord {
  judul: string;
  deskripsi?: string;
  pertanyaan: string;
  opsiA: string;
  opsiB: string;
  opsiC: string;
  opsiD: string;
  opsiE: string;
  jawabanBenar: string;
  pembahasan?: string;
}

export async function POST(request: Request) {
  try {
    console.log('🔵 [Upload] Memulai proses upload paket soal');

    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user?.id) {
      console.log('🔴 [Upload] Error: User tidak terautentikasi');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Cek apakah user adalah admin
    const adminUser = await prisma.user.findUnique({
      where: { id: user.id }
    });

    if (!adminUser || adminUser.role !== 'ADMIN') {
      console.log('🔴 [Upload] Error: User bukan admin', {
        userId: user.id,
        role: adminUser?.role
      });
      return new NextResponse('Forbidden', { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.log('🔴 [Upload] Error: File tidak ditemukan');
      return NextResponse.json(
        { error: 'File wajib diupload' },
        { status: 400 }
      );
    }

    console.log('🔵 [Upload] Info file:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Baca file sebagai array buffer
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });

    // Log info workbook
    console.log('🔵 [Upload] Info workbook:', {
      sheetNames: workbook.SheetNames,
      activeSheet: workbook.SheetNames[0]
    });

    // Ambil sheet pertama
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Konversi ke JSON
    const records = XLSX.utils.sheet_to_json<XLSXRecord>(worksheet);

    if (records.length === 0) {
      console.log('🔴 [Upload] Error: File Excel kosong');
      return NextResponse.json(
        { error: 'File kosong atau tidak memiliki data yang valid' },
        { status: 400 }
      );
    }

    console.log('🔵 [Upload] Jumlah records:', records.length);

    // Ambil data paket soal dari baris pertama data (baris 2 di Excel)
    const firstRow = records[0];
    console.log('🔵 [Upload] Data paket soal:', {
      judul: firstRow.judul,
      deskripsi: firstRow.deskripsi
    });

    if (!firstRow.judul) {
      console.log('🔴 [Upload] Error: Judul paket soal kosong');
      return NextResponse.json(
        { error: 'Judul paket soal wajib diisi' },
        { status: 400 }
      );
    }

    // Buat paket soal baru
    console.log('🔵 [Upload] Membuat paket soal baru');
    const paketSoal = await prisma.paketSoal.create({
      data: {
        judul: firstRow.judul,
        deskripsi: firstRow.deskripsi || null
      }
    });
    console.log('🔵 [Upload] Paket soal berhasil dibuat:', {
      id: paketSoal.id,
      judul: paketSoal.judul
    });

    // Validasi dan mapping soal
    const soalData = records.map((soal, idx) => {
      // Validasi kolom wajib
      if (
        !soal.pertanyaan ||
        !soal.opsiA ||
        !soal.opsiB ||
        !soal.opsiC ||
        !soal.opsiD ||
        !soal.opsiE ||
        !soal.jawabanBenar
      ) {
        throw new Error(`Format soal tidak valid di baris ${idx + 2}`);
      }
      // Cast semua opsi ke string
      return {
        pertanyaan: String(soal.pertanyaan),
        opsiA: String(soal.opsiA),
        opsiB: String(soal.opsiB),
        opsiC: String(soal.opsiC),
        opsiD: String(soal.opsiD),
        opsiE: String(soal.opsiE),
        jawabanBenar: String(soal.jawabanBenar),
        pembahasan: soal.pembahasan ? String(soal.pembahasan) : undefined,
        paketSoalId: paketSoal.id
      };
    });

    // Upload soal ke database
    console.log('🔵 [Upload] Mulai upload soal-soal:', {
      jumlahSoal: soalData.length
    });

    try {
      await prisma.soal.createMany({
        data: soalData
      });
      console.log('✅ [Upload] Soal-soal berhasil diupload');
    } catch (error) {
      console.error('🔴 [Upload] Error saat upload soal:', error);
      // Hapus paket soal jika upload soal gagal
      await prisma.paketSoal.delete({
        where: { id: paketSoal.id }
      });
      throw error;
    }

    return NextResponse.json({
      message: 'Paket soal berhasil diupload',
      data: {
        paketSoal,
        soalCount: soalData.length
      }
    });
  } catch (error) {
    console.error('🔴 [Upload] Error tidak terduga:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
