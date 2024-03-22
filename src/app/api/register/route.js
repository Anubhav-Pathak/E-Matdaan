import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {uploadFile} from '@/utils/s3Bucket';

const prisma = new PrismaClient();

export const POST = async (req) => {
    try{
        const data = await req.formData();

        const userType = data.get('user');
        const email = data.get('email');
        const name = data.get('name');
        const contact = data.get('contact');
        const areaCode = data.get('areaCode');
    
        const user = {email, name, contact, areaCode};

        if (userType === 'voter'){
            const voterImage = await data.get('voterImage');
            const voter = await prisma.voter.findUnique({where: {email: email}});
            if (voter) return NextResponse.json({message: "Voter already exists"}, {status: 409});
            const newUser = await prisma.voter.create({data: user});
            const image = await uploadFile('profiles', `${newUser.id}`, voterImage);
            await prisma.voter.update({where: {id: newUser.id}, data: {profile: image.Location}});
            return NextResponse.json({message: "Voter created successfully"}, {status: 200});
        }
        if (userType === 'candidate'){
            const candidate = await prisma.candidate.findUnique({where: {email: email}});
            if (candidate) return NextResponse.json({message: "Candidate already exists"}, {status: 409});
            await prisma.candidate.create({data: user});
            return NextResponse.json({message: "Candidate created successfully"}, {status: 200});
        }
    } catch(error){
        console.log(error);
        return NextResponse.json({message: "Error creating user"}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}