-- CreateTable
CREATE TABLE "TryoutHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paketSoalId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "timeSpent" INTEGER NOT NULL,
    "answers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TryoutHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TryoutHistory_userId_idx" ON "TryoutHistory"("userId");

-- CreateIndex
CREATE INDEX "TryoutHistory_paketSoalId_idx" ON "TryoutHistory"("paketSoalId");

-- AddForeignKey
ALTER TABLE "TryoutHistory" ADD CONSTRAINT "TryoutHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TryoutHistory" ADD CONSTRAINT "TryoutHistory_paketSoalId_fkey" FOREIGN KEY ("paketSoalId") REFERENCES "PaketSoal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
