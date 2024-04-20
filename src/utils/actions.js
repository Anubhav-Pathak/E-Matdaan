'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import crypto from 'crypto';

import { compareImages } from './flaskAPI';

import { uploadFile, getFilefromUrl } from './s3Bucket';

const prisma = new PrismaClient();

export const addElection = async (prevState, formData) => {
    const name = formData.get('name');
    const start_date = new Date(formData.get('start_date')).toISOString();
    const end_date = new Date(formData.get('end_date')).toISOString();
    const election = await prisma.election.findFirst({where: {name: name}});
    if(election) return {error: 'Election name already exists.'};
    await prisma.election.create({data: {name: name, startdate: start_date, enddate: end_date}});
    await prisma.$disconnect();
    revalidatePath('/admin');
    redirect('/admin');
};

export const addCandidate = async (prevState, formData) => {
    const name = formData.get('name');
    const areaCode = formData.get('areaCode');
    const candidate = await prisma.candidate.findFirst({where: {name: name}});
    if(candidate) return {error: 'Candidate name already exists.'};
    await prisma.candidate.create({data: {name: name, areaCode: areaCode}});
    await prisma.$disconnect();
    revalidatePath('/admin');
    redirect('/admin');
};

export const login = async (prevState, formData) => {
    if (formData.has('aadhar')){
        const aadhar = formData.get('aadhar');
        const userImage = formData.get('profile');
        const voter = await prisma.voter.findUnique({where: {aadhar: aadhar}});
        await prisma.$disconnect();
        if(!voter) return {error: 'Invalid User'};
        const voterImage = Buffer.from((await getFilefromUrl(voter.profile)).Body).toString('base64');
        const matched = await compareImages(voterImage, userImage);
        if(matched){
            redirect(`/dashboard/voter/${voter.id}`);
        }
        else {
            return {error: 'Invalid User'};
        }
    }
    else if(formData.has('passkey')){
        const passkey = formData.get('passkey');
        const candidate = await prisma.candidate.findFirst({where: {passkey: passkey}});
        await prisma.$disconnect();
        if(candidate){
            redirect(`/dashboard/candidate/${candidate.id}`);
        }
        return {error: 'Invalid Passkey.'};
    }
};

export const registerVoter = async (prevState, formData) => {
    const aadhar = formData.get('aadhar');
    const voter = await prisma.voter.findFirst({where: {aadhar: aadhar}});
    if(voter) return {error: 'Voter with this Aadhar already exists.'};
    const name = formData.get('name');
    const areaCode = formData.get('areaCode');
    const contact = formData.get('contact');
    const profile = formData.get('profile').split(';base64,').pop();
    const newVoter = await prisma.voter.create({data: {name: name, aadhar: aadhar, areaCode: areaCode, contact: contact}});
    const image = await uploadFile('profiles', `${newVoter.id}.jpeg`, profile);
    await prisma.voter.update({where: {id: newVoter.id}, data: {profile: image.Location}});
    await prisma.$disconnect();
    redirect('/');
}

export const enroll = async (electionID, candidateID) => {
    await prisma.election.update({
        where: { id: electionID },
        data: {
            candidates: {
                connect: {
                    id: candidateID
                }
            }
        }
    });
    await prisma.candidate.update({
        where: { id: candidateID },
        data: {
            election: {
                connect: {
                    id: electionID
                }
            }
        }
    });
    await prisma.$disconnect();
    revalidatePath('/dashboard/candidate/'+candidateID);
    redirect('/dashboard/candidate/'+candidateID);
};

export const vote = async (voterID, electionID, candidateID) => {
    const id = crypto.createHash('sha256').update(`${voterID}${electionID}${candidateID}`).digest('hex');
    await prisma.election.update({
        where: { id: electionID },
        data: {voters: {connect: {id: voterID}}}
    });
    await prisma.vote.create({data: {
        id: id, 
        voterID: voterID, 
        candidateID: candidateID,
        electionID: electionID
    }});
    await prisma.$disconnect();
    revalidatePath('/dashboard/voter/'+voterID);
    redirect('/dashboard/voter/'+voterID);
};
