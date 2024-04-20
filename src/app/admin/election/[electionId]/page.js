import ElectionFallback from "@/components/fallbacks/Election";
import { Election } from "@/utils/loaders";
import { Suspense } from "react";

const Page = ({params}) => {
    const {electionId} = params;
    return (
        <main className="p-8">
            <Suspense fallback={<ElectionFallback />}>
                <Election id={electionId} />
            </Suspense>
        </main>
    )
}

export default Page;