import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import {getFilefromUrl} from '@/utils/s3Bucket';
import { compareImages } from '@/utils/flaskAPI';

const prisma = new PrismaClient();

export const POST = async (req) => {
    try{
        const data = await req.formData();
        const email = data.get('email');
        const voterImage = await data.get('voterImage');

        const voter = await prisma.voter.findUnique({where: {email: email}});
        if (!voter) return NextResponse.json({message: "User does not exist"}, {status: 401});

        const userImage = Buffer.from((await getFilefromUrl(voter.profile)).Body).toString('base64');

        const matched = await compareImages(voterImage, userImage);

        if (matched){
            // Session creations
            req.session.set('user', voter);
            await req.session.save();
            return NextResponse.json({message: "Success"}, {status: 200});
        }
        else {
            return NextResponse.json({message: "Invalid user"}, {status: 401});
        }

    } catch(error){
        console.log(error);
        return NextResponse.json({message: "Something Went Wrong !"}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}