"use client";
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';

import useUserStore from '@/store/UserStore';
import useLoadingStore from '@/store/LoadingStore';
import useToastStore from '@/store/ToastStore';

import ElectionCard from '@/components/ElectionCard';
import VoterModal from '@/components/VoterModal';
import CardSkeleton from '@/components/ui/CardSkeleton';
import UserNavbar from '@/components/UserNavbar';
import Toast from '@/components/ui/Toast';

const Page = () => {
    const router = useRouter();
    const { id } = useParams();
    const { user } = useUserStore();

    const [elections, setElections] = useState([]);
    const [electionId , setElectionId] = useState(null);
    const { addToast } = useToastStore();

    useEffect(() => {
        (async () => {
            const response = await fetch('/api/elections', { method: 'GET' });
            const data = await response.json();
            if (!response.ok) {
                addToast({ message: data.message, type: 'error' });
                return;
            }
            setElections(data);
        })();

    }, [elections])

    return (
        <main className='p-8 bg-base-100'>
            {/* <UserNavbar name={user.name} profile={user.profile} logout={logout}/> */}
            <h1 className='text-3xl font-bold'>Welcome, {user.name}</h1>
            <section className="flex justify-center flex-col p-4 bg-base-200">
                <h1 className="text-center text-7xl font-bold mb-12">Elections</h1>
                <div className="mx-auto carousel carousel-center max-w-7xl p-4 space-x-4 bg-base-200 rounded-box">
                {
                    elections.length !== 0 ? elections.map((election, index) => <ElectionCard key={index} {...election} isUser={true} electionId={setElectionId} />) : <p>No Elections right now ...</p>
                }
                </div>
            </section>
            <VoterModal id={electionId}/>
            <Toast />
        </main>
    )
}

export default Page
