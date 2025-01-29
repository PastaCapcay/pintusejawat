import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { examId, answers } = await request.json()

    // Dapatkan user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Dapatkan exam dan soal-soalnya
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: { questions: true }
    })

    if (!exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 })
    }

    // Hitung score
    let correctAnswers = 0
    exam.questions.forEach(question => {
      if (answers[question.id] === question.answer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / exam.questions.length) * 100)

    // Simpan hasil ke ExamResult
    const result = await prisma.examResult.create({
      data: {
        examId,
        userId: user.id,
        score,
        answers
      }
    })

    return NextResponse.json({ resultId: result.id })
  } catch (error) {
    console.error('Error submitting exam:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 