import {NextResponse} from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export const POST = async (res) => {
    const {voterId, candidateId, electionId} = await res.json();
    const hash = crypto.createHash('sha256');
    hash.update(voterId + candidateId + electionId);
    const id = hash.digest('hex');
    await prisma.vote.create({data: {id: id, voterID: +voterId, candidateID: +candidateId, electionID: +electionId}});
    return NextResponse.json({message: "Vote added"}, {status: 200});
}