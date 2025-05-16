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

    if (!file) {
      return NextResponse.json(
        { error: 'File wajib diupload' },
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

    // Ambil data paket soal dari baris pertama
    const firstRow = records[0];
    if (!firstRow.judul) {
      return NextResponse.json(
        { error: 'Judul paket soal wajib diisi' },
        { status: 400 }
      );
    }

    // Validasi format data soal
    const errors: string[] = [];
    records.slice(1).forEach((record: XLSXRecord, index: number) => {
      if (
        !record.pertanyaan ||
        !record.opsiA ||
        !record.opsiB ||
        !record.opsiC ||
        !record.opsiD ||
        !record.opsiE ||
        !record.jawabanBenar
      ) {
        errors.push(`Baris ${index + 2}: Semua kolom wajib terisi`);
      }

      if (
        !['A', 'B', 'C', 'D', 'E'].includes(record.jawabanBenar?.toUpperCase())
      ) {
        errors.push(
          `Baris ${index + 2}: Jawaban benar harus berupa A, B, C, D, atau E`
        );
      }
    });

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Format soal tidak valid', details: errors },
        { status: 400 }
      );
    }

    // Buat paket soal baru
    const paketSoal = await prisma.paketSoal.create({
      data: {
        judul: firstRow.judul,
        deskripsi: firstRow.deskripsi || null
      }
    });

    // Upload soal ke database
    const soalData = records.slice(1).map((record: XLSXRecord) => ({
      pertanyaan: record.pertanyaan,
      opsiA: record.opsiA,
      opsiB: record.opsiB,
      opsiC: record.opsiC,
      opsiD: record.opsiD,
      opsiE: record.opsiE,
      jawabanBenar: record.jawabanBenar.toUpperCase(),
      pembahasan: record.pembahasan || null,
      paketSoalId: paketSoal.id
    }));

    await prisma.soal.createMany({
      data: soalData
    });

    return NextResponse.json({
      message: 'Paket soal berhasil diupload',
      data: {
        paketSoal,
        soalCount: soalData.length
      }
    });
  } catch (error) {
    console.error('Error uploading paket soal:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
