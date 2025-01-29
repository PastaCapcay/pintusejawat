import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import * as XLSX from 'xlsx'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    // Cek autentikasi
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) {
      return new NextResponse('No file uploaded', { status: 400 })
    }

    // Baca file Excel
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = XLSX.utils.sheet_to_json(worksheet)

    // Validasi format data
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      return new NextResponse('Invalid Excel format', { status: 400 })
    }

    // Ambil title dan description dari baris pertama
    const firstRow = jsonData[0] as any
    const title = firstRow.title || file.name.replace(/\.[^/.]+$/, "")
    const description = firstRow.description || `Imported from Excel on ${new Date().toLocaleString()}`

    // Proses data Excel dengan field yang valid saja
    const exam = await prisma.exam.create({
      data: {
        title,
        description,
        questions: {
          create: jsonData.map((row: any) => ({
            question: row.question || '',
            optionA: row.optionA || '',
            optionB: row.optionB || '',
            optionC: row.optionC || '',
            optionD: row.optionD || '',
            optionE: row.optionE || '',
            answer: row.answer || '',
            explanation: row.explanation || ''
          }))
        }
      },
      include: {
        questions: {
          select: {
            id: true,
            question: true,
            optionA: true,
            optionB: true,
            optionC: true,
            optionD: true,
            optionE: true,
            answer: true,
            explanation: true
          }
        }
      }
    })

    return NextResponse.json({ 
      success: true, 
      count: jsonData.length,
      examId: exam.id 
    })

  } catch (error) {
    console.error('Error processing Excel:', error)
    return new NextResponse('Error processing Excel file', { status: 500 })
  }
} 