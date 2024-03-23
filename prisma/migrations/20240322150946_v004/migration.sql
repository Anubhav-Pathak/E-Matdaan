/*
  Warnings:

  - You are about to drop the column `date` on the `Election` table. All the data in the column will be lost.
  - Added the required column `enddate` to the `Election` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startdate` to the `Election` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Election" DROP COLUMN "date",
ADD COLUMN     "enddate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startdate" TIMESTAMP(3) NOT NULL;
