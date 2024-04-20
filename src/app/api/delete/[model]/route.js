import {NextResponse} from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DELETE = async (req, res) => {
    
    const url = new URL(req.url);
    const model = url.pathname.split('/')[3];
    const id = url.searchParams.get('id');
    try{
        if(model === 'election'){
            await prisma.vote.deleteMany({ where: { electionID: parseInt(id) } });
            await prisma.election.delete({ where: { id: parseInt(id) } });
            return NextResponse.json({message: "Election Deleted"}, {status: 200});
        }
        else if(model === 'voter'){
            await prisma.vote.deleteMany({ where: { voterID: parseInt(id) } });
            await prisma.voter.delete({ where: { id: parseInt(id) } });
            return NextResponse.json({message: "Voter Deleted"}, {status: 200});
        }
        else if (model === 'candidate'){
            await prisma.vote.deleteMany({ where: { candidateID: parseInt(id) } });
            await prisma.candidate.delete({ where: { id: parseInt(id) } });
            return NextResponse.json({message: "Candidate Deleted"}, {status: 200});
        }
    } catch(error){
        console.log(error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
    finally{
        await prisma.$disconnect();
    }
}