import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

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

export async function POST(request: Request) {
  try {
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

    // Upload soal ke database
    const createdSoal = await prisma.$transaction(
      records.map((record) =>
        prisma.soal.create({
          data: {
            pertanyaan: record.pertanyaan,
            opsiA: record.opsiA,
            opsiB: record.opsiB,
            opsiC: record.opsiC,
            opsiD: record.opsiD,
            opsiE: record.opsiE,
            jawabanBenar: record.jawabanBenar.toUpperCase(),
            pembahasan: record.pembahasan || null,
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
  } finally {
    await prisma.$disconnect();
  }
}
