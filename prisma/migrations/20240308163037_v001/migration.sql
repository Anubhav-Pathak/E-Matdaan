-- CreateTable
CREATE TABLE "Election" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Election_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "candidateID" INTEGER NOT NULL,
    "voterID" INTEGER NOT NULL,
    "electionID" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ElectionCandidates" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ElectionVoters" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ElectionCandidates_AB_unique" ON "_ElectionCandidates"("A", "B");

-- CreateIndex
CREATE INDEX "_ElectionCandidates_B_index" ON "_ElectionCandidates"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ElectionVoters_AB_unique" ON "_ElectionVoters"("A", "B");

-- CreateIndex
CREATE INDEX "_ElectionVoters_B_index" ON "_ElectionVoters"("B");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_candidateID_fkey" FOREIGN KEY ("candidateID") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voterID_fkey" FOREIGN KEY ("voterID") REFERENCES "Voter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_electionID_fkey" FOREIGN KEY ("electionID") REFERENCES "Election"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElectionCandidates" ADD CONSTRAINT "_ElectionCandidates_A_fkey" FOREIGN KEY ("A") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElectionCandidates" ADD CONSTRAINT "_ElectionCandidates_B_fkey" FOREIGN KEY ("B") REFERENCES "Election"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElectionVoters" ADD CONSTRAINT "_ElectionVoters_A_fkey" FOREIGN KEY ("A") REFERENCES "Election"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElectionVoters" ADD CONSTRAINT "_ElectionVoters_B_fkey" FOREIGN KEY ("B") REFERENCES "Voter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
