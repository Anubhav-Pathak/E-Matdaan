import { Suspense } from "react";

import StatsFallback from "@/components/fallbacks/Stats";
import AdminNavbar from "@/components/AdminNavbar";
import ElectionModal from "@/components/ElectionModal";
import CandidateModal from "@/components/CandidateModal";
import ElectionsFallback from "@/components/fallbacks/Elections";
import { Elections, Stats } from "@/utils/loaders";

const Admin = () => {
    return (
        <main className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <CandidateModal />
            <ElectionModal />
            <div className="drawer-content flex flex-col bg-neutral">
                {/* Page content here */}
                <AdminNavbar />
                <section className="min-h-screen flex items-center justify-evenly gap-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">Elections</h1>
                        <Suspense fallback={<ElectionsFallback />}> <Elections /> </Suspense>
                    </div>
                    <Suspense fallback={<StatsFallback />}> <Stats /> </Suspense>
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