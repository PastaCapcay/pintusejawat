import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'

export async function GET() {
  try {
    // Buat workbook baru
    const workbook = XLSX.utils.book_new()

    // Data template dengan header dan contoh baris
    const templateData = [
      {
        title: 'Contoh: Ujian Anatomi Dasar',
        description: 'Contoh: Ujian ini mencakup materi anatomi dasar semester 1',
        question: 'Contoh: Apa yang dimaksud dengan...',
        optionA: 'Jawaban A',
        optionB: 'Jawaban B',
        optionC: 'Jawaban C',
        optionD: 'Jawaban D',
        optionE: 'Jawaban E',
        answer: 'A',
        explanation: 'Penjelasan jawaban...'
      }
    ]

    // Buat worksheet
    const worksheet = XLSX.utils.json_to_sheet(templateData)

    // Atur lebar kolom
    const wscols = [
      {wch: 30}, // title
      {wch: 40}, // description
      {wch: 50}, // question
      {wch: 30}, // optionA
      {wch: 30}, // optionB
      {wch: 30}, // optionC
      {wch: 30}, // optionD
      {wch: 30}, // optionE
      {wch: 10}, // answer
      {wch: 50}  // explanation
    ]
    worksheet['!cols'] = wscols

    // Tambahkan worksheet ke workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template Soal')

    // Generate buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    // Set headers untuk download
    const headers = new Headers()
    headers.append('Content-Disposition', 'attachment; filename="template-soal.xlsx"')
    headers.append('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    return new NextResponse(buffer, { headers })
  } catch (error) {
    console.error('Error generating template:', error)
    return new NextResponse('Error generating template', { status: 500 })
  }
} 