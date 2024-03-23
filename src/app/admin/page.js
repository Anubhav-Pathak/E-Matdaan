"use client";

import { useEffect, useState } from "react";

import AdminHero from "@/components/AdminHero";
import AdminNavbar from "@/components/AdminNavbar";
import ElectionCard from '@/components/ElectionCard';
import CardSkeleton from "@/components/ui/CardSkeleton";

import useToastStore from "@/store/ToastStore";
import useLoadingStore from "@/store/LoadingStore";
import ElectionModal from "@/components/ElectionModal";
import Toast from "@/components/ui/Toast";

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
            <ElectionModal />
            <Toast />
            <div className="drawer-content flex flex-col bg-neutral">
                {/* Navbar */}
                <AdminNavbar />
                {/* Page content here */}
                <AdminHero />
                <section className="flex justify-center flex-col p-4 bg-base-200">
                    <h1 className="text-center text-7xl font-bold mb-12">Elections</h1>
                    <div className="mx-auto carousel carousel-center max-w-7xl p-4 space-x-4 bg-base-200 rounded-box">
                    {
                        loadingStates["elections"] ? 
                        <CardSkeleton />
                        : 
                        elections.length !== 0 ? elections.map((election, index) => <ElectionCard key={index} {...election} isUser={false} />) : <p>No Elections right now ...</p>
                    }
                    </div>
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