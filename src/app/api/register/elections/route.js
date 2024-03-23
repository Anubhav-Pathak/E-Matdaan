import {NextResponse} from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req) => {
    const {name, startDate, endDate} = await req.json();
    try{
        await prisma.election.create({data: {name: name, startdate: new Date(startDate).toISOString(), enddate: new Date(endDate).toISOString()}});
        return NextResponse.json({message: "Election created successfully"}, {status: 200});
    } catch(error){
        console.log(error);
        return NextResponse.json({message: "Error creating election"}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}