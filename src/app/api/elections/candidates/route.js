import {NextResponse} from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (res) => {
    const {name, date} = await res.json();
    await prisma.election.create({data: {name: name, date: date}});
    return NextResponse.json({message: "Election created"}, {status: 200});
}

export const GET = async (res) => {
    try{
        const candidates = await prisma.candidate.findMany();
        return NextResponse.json(candidates, {status: 200});
    } catch(error){
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}
