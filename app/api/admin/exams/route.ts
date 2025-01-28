import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    // Cek autentikasi dan role admin
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      })
    }

    const body = await req.json()
    const { title, description, questions } = body

    // Validasi input
    if (!title || !description || !questions || questions.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'Semua field harus diisi' }), {
        status: 400,
      })
    }

    // Buat exam dan questions dengan field yang valid saja
    const exam = await prisma.exam.create({
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

export async function GET() {
  try {
    // Cek autentikasi dan role admin
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      })
    }

    const exams = await prisma.exam.findMany({
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(exams)
  } catch (error) {
    console.error('Error:', error)
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    })
  } finally {
    await prisma.$disconnect()
  }
} 