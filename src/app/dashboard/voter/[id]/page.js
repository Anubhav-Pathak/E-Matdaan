import { Suspense } from "react";
import { NotVotedElections, VoterDetails, VoterVotes } from "@/utils/loaders";
import ElectionFallback from "@/components/fallbacks/Election";

const Page = ({params}) => {
    const { id } = params;
    return (
        <main className='p-8 bg-base-100 min-h-screen'>
            <Suspense fallback={<div className="skeleton w-72 h-14"></div>}>
                <VoterDetails id={id} />
            </Suspense>
            <section className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-4">Vote now !</h2>
                    <div className="carousel max-w-xl space-x-4 rounded-box">
                    <Suspense fallback={<ElectionFallback />}>
                        <NotVotedElections id={id} />
                    </Suspense>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl text-right font-bold mb-4">Votes Casted </h2>
                    <ul className="h-72 space-y-2 overflow-y-scroll">
                        <Suspense fallback={<div className="skeleton w-72 h-14"></div>}>
                            <VoterVotes id={id} />
                        </Suspense>
                    </ul>
                </div>
            </section>
            {/* <VotingModal /> */}
        </main>
    )
}

export default Page
