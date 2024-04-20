import { Suspense } from "react";
import { Candidate } from "@/utils/loaders";
import CandidateFallback from "@/components/fallbacks/Candidate";

const Page = ({params}) => {
    const { id } = params;
    return (
        <main className='p-8 bg-base-100 min-h-screen'>
            <Suspense fallback={<CandidateFallback />}>
                <Candidate id={id} />
            </Suspense>
        </main>
    )
}

export default Page
