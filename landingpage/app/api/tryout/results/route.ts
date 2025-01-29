import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

interface Question {
  id: string
  answer: string
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    const body = await req.json()
    const { examId, answers, timeSpent } = body

    // Validasi input
    if (!examId || !answers || typeof timeSpent !== 'number') {
      return new NextResponse('Invalid input', { status: 400 })
    }

    // Ambil exam dan soal-soalnya
    const exam = await prisma.exam.findUnique({
      where: {
        id: examId
      },
      include: {
        questions: true
      }
    })

    if (!exam) {
      return new NextResponse('Exam not found', { status: 404 })
    }

    // Hitung skor
    let correctAnswers = 0
    exam.questions.forEach((question: Question) => {
      if (answers[question.id] === question.answer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / exam.questions.length) * 100)

    // Simpan hasil
    const result = await prisma.tryoutResult.create({
      data: {
        examId,
        userId: user.id,
        score,
        answers,
        timeSpent
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('[TRYOUT_RESULTS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 