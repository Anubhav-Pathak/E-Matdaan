"use client";

import { useEffect, useState } from "react";

import AdminHero from "@/components/AdminHero";
import AdminNavbar from "@/components/AdminNavbar";
import ElectionCard from '@/components/ElectionCard';
import CardSkeleton from "@/components/ui/CardSkeleton";

import useToastStore from "@/store/ToastStore";
import useLoadingStore from "@/store/LoadingStore";

const Admin = () => {

    const [elections, setElections] = useState([]);
    const {toasts, addToast} = useToastStore();
    const {loadingStates, setLoadingState} = useLoadingStore();

    useEffect(() => {
        setLoadingState("elections", true);
        (async () => {
            const response = await fetch('/api/elections', { method: 'GET' });
            const data = await response.json();
            if (!response.ok) {
                addToast({ message: data.message, type: 'error' });
                return;
            }
            setElections(data);
        })();
        setLoadingState("elections", false);

    }, [elections, setElections, addToast, setLoadingState])


    return (
        <main className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <div className="drawer-content flex flex-col bg-neutral">
                {/* Navbar */}
                <AdminNavbar />
                {/* Page content here */}
                <AdminHero />
                <section className='grid grid-cols-4 p-8'>
                    <h1 className="text-center text-3xl font-bold col-span-full mb-4">Elections</h1>
                    {
                        loadingStates["elections"] ? 
                        <CardSkeleton />
                        : 
                        elections.length !== 0 ? elections.map((election, index) => <ElectionCard key={index} {...election} />) : <p>No Elections right now ...</p>
                    }
                </section>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full bg-base-200">
                {/* Sidebar content here */}
                <li><a>Elections</a></li>
                <li><a>Register</a></li>
                </ul>
            </div>  
        </main>
    )
}

export default Admin;