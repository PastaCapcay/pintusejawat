import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

// PUT /api/admin/exams/[id] - Update exam
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Cek autentikasi dan role admin
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      })
    }

    const body = await request.json()
    const { title, description, questions } = body

    // Validasi input
    if (!title || !description || !questions || questions.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'Semua field harus diisi' }), {
        status: 400,
      })
    }

    // Update exam dan questions
    const exam = await prisma.$transaction(async (tx) => {
      // Hapus questions lama
      await tx.question.deleteMany({
        where: { examId: params.id }
      })

      // Update exam dan buat questions baru dengan field yang valid saja
      const updatedExam = await tx.exam.update({
        where: { id: params.id },
        data: {
          title,
          description,
          questions: {
            create: questions.map((q: any) => ({
              question: q.question,
              optionA: q.optionA,
              optionB: q.optionB,
              optionC: q.optionC,
              optionD: q.optionD,
              optionE: q.optionE,
              answer: q.answer,
              explanation: q.explanation
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

      return updatedExam
    })

    return NextResponse.json(exam)
  } catch (error) {
    console.error('Error:', error)
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    })
  } finally {
    await prisma.$disconnect()
  }
}

// DELETE /api/admin/exams/[id] - Delete exam
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Cek autentikasi dan role admin
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      })
    }

    // Hapus exam (questions akan terhapus otomatis karena onDelete: Cascade)
    await prisma.exam.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Soal berhasil dihapus' })
  } catch (error) {
    console.error('Error:', error)
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    })
  } finally {
    await prisma.$disconnect()
  }
} 