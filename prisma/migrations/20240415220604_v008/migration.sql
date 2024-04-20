/*
  Warnings:

  - You are about to drop the column `votes` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Voter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[passkey]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[aadhar]` on the table `Voter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aadhar` to the `Voter` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Voter_email_key";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "votes";

-- AlterTable
ALTER TABLE "Voter" DROP COLUMN "email",
ADD COLUMN     "aadhar" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_passkey_key" ON "Candidate"("passkey");

-- CreateIndex
CREATE UNIQUE INDEX "Voter_aadhar_key" ON "Voter"("aadhar");
