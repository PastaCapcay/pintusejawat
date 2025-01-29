-- CreateTable
CREATE TABLE "TryoutResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "timeSpent" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TryoutResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TryoutResult_userId_idx" ON "TryoutResult"("userId");

-- CreateIndex
CREATE INDEX "TryoutResult_examId_idx" ON "TryoutResult"("examId");

-- AddForeignKey
ALTER TABLE "TryoutResult" ADD CONSTRAINT "TryoutResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TryoutResult" ADD CONSTRAINT "TryoutResult_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
