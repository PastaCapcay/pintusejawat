-- DropForeignKey
ALTER TABLE "Soal" DROP CONSTRAINT "Soal_paketSoalId_fkey";

-- AddForeignKey
ALTER TABLE "Soal" ADD CONSTRAINT "Soal_paketSoalId_fkey" FOREIGN KEY ("paketSoalId") REFERENCES "PaketSoal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
