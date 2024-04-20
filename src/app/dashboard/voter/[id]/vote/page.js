import { VoterCandidates } from "@/utils/loaders";
import { Suspense } from "react";

const Page = ({params, searchParams}) => {
    const voterID = params.id;
    const electionID = searchParams.electionID;
  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
            <VoterCandidates voterID={voterID} electionID={electionID}/>
        </Suspense>
    </div>
  )
}

export default Page