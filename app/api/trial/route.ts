import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Ambil 100 soal random dengan jawaban dan penjelasan
    const questions = await prisma.$queryRaw`
      SELECT id, question, "optionA", "optionB", "optionC", "optionD", "optionE", answer, explanation
      FROM "Question"
      ORDER BY RANDOM()
      LIMIT 100
    `

    return NextResponse.json(questions)
  } catch (error) {
    console.error("Error in GET /api/trial:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 