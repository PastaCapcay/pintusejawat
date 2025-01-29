/*
  Warnings:

  - You are about to drop the column `timeSpent` on the `ExamResult` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ExamResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExamResult" DROP COLUMN "timeSpent",
DROP COLUMN "type";
