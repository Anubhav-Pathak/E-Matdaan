/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Voter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Voter_name_key" ON "Voter"("name");
