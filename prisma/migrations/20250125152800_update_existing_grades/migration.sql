-- Ubah kolom grade menjadi text
ALTER TABLE "User" ALTER COLUMN grade TYPE text;

-- Update nilai grade
UPDATE "User"
SET grade = 'DIAMOND'
WHERE grade = 'A';

UPDATE "User"
SET grade = 'GOLD'
WHERE grade = 'B';

UPDATE "User"
SET grade = 'SILVER'
WHERE grade = 'C';

-- Drop enum lama
DROP TYPE IF EXISTS "Grade";

-- Buat enum baru
CREATE TYPE "Grade" AS ENUM ('DIAMOND', 'GOLD', 'SILVER');

-- Ubah kolom grade kembali ke enum
ALTER TABLE "User" 
  ALTER COLUMN grade TYPE "Grade" 
  USING grade::"Grade"; 