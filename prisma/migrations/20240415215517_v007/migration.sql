/*
  Warnings:

  - You are about to drop the column `contact` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `voted` on the `Voter` table. All the data in the column will be lost.
  - Added the required column `passkey` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Candidate_email_key";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "contact",
DROP COLUMN "email",
ADD COLUMN     "passkey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Election" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'upcoming';

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Voter" DROP COLUMN "voted";
