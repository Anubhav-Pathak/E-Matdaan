import ElectionCard from "@/components/ElectionCard";
import Barplot from "@/components/Barplot"
import { getElections, getStats, getElection, getCandidate, getVoterDetails, getNotVotedElections, getVoterVotes, getVoterCandidates } from "@/utils/db";
import { DeleteButton, VoteButton } from "@/components/ActionButtons";

export async function Elections(){
    const elections = await getElections();
    return (
        <div className="carousel max-w-xl space-x-4 bg-neutral rounded-box">{
            elections.map((election, index) => 
                <div key={index} className="carousel-item"> 
                    <ElectionCard {...election} isUser={false} /> 
                </div>
            )  
        }</div>
    )
}

export async function Stats(){
    const stats = await getStats();
    return (
        <div className="stats stats-vertical shadow">
            <div className="stat">
                <div className="stat-title">Total Elections</div>
                <div className="stat-value">{stats.n_elections}</div>
            </div>
            <div className="stat">
                <div className="stat-title">Total Registered Candidates</div>
                <div className="stat-value">{stats.n_candidates}</div>
            </div>
            <div className="stat">
                <div className="stat-title">Total Registered Voters</div>
                <div className="stat-value">{stats.n_voters}</div>
            </div>
            <div className="stat">
                <div className="stat-title">Total Votes Casted</div>
                <div className="stat-value">{stats.n_votes}</div>
            </div>            

        </div>
    )
}

export async function Election(id){
    const election = await getElection(id);
    return (
        <div>
            <header className="flex items-center justify-between">
                <h1 className="text-5xl font-bold mb-4">{election.name}</h1>
                <div className="flex space-x-4">
                    <DeleteButton type="election" id={election.id} redirect={'admin'}/>
                    <button className="btn btn-primary">Edit...</button>
                </div>
            </header>
            <ul className="flex space-x-4" style={{marginBottom: "2rem"}}>
                <li><button className="btn">Startdate<div className="badge">{election.startdate.toLocaleDateString('en-IN')}</div></button></li>
                <li><button className="btn">Enddate<div className="badge">{election.enddate.toLocaleDateString('en-IN')}</div></button></li>
            </ul>
            <section className="grid grid-cols-4 gap-4">
                <ul className="max-w-96 h-64 overflow-y-scroll">
                    <li><h2 className="text-xl font-bold mb-4">Registered Candidates</h2></li>
                    {election.candidates.map((candidate, index) => <li key={index}> {candidate.name}</li>)}
                </ul>
                <ul className="max-w-96 h-64 overflow-y-scroll">
                    <li><h2 className="text-xl font-bold mb-4">Registered Voters</h2></li>
                    {election.voters.map((voter, index) => <li key={index}>{voter.name}</li>)}
                </ul>
                <aside className="border-2 col-start-3 col-end-5">
                    <Barplot election={election} />
                </aside>
                <div className="overflow-x-auto col-span-full">
                    <h2 className="text-xl font-bold">Votes Casted</h2>
                    <table className="table table-xs table-pin-rows table-pin-cols">
                        <thead>
                            <tr>
                                <th>Vote ID</th>
                                <th>From</th>
                                <th>To</th>
                            </tr>
                        </thead>
                        <tbody>
                            {election.votes.map((vote, index) => (
                                <tr key={index}>
                                    <td>{vote.id}</td>
                                    <td>{vote.voter.name}</td>
                                    <td>{vote.candidate.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export async function Candidate(id){
    const {candidate, registeredElection, unregisteredElection} = await getCandidate(id);
    return (
        <div>
            <header className="flex items-center justify-between">
                <h1 className="font-bold mb-4 text-7xl">{candidate.name}</h1>
                <div className="inline space-x-4">
                    <DeleteButton type="candidate" id={candidate.id} redirect={'/'}/>
                    <button className="btn btn-primary">Edit...</button>
                </div>
            </header>
            <button className="btn mb-12">Area Code: <div className="badge">{candidate.areaCode}</div></button>
            <section className="mb-12 grid grid-cols-2 gap-8">
                <div>
                    <h2 className="text-4xl font-bold mb-4">Stats</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra table-pin-rows">
                            <thead>
                                <tr>
                                    <th className="border-2 p-2">Election Name</th>
                                    <th className="border-2 p-2">Votes</th>
                                </tr>
                            </thead>
                            <tbody>{registeredElection.map((election, index) =>
                                <tr key={index}>
                                    <td className="border-2 p-2">{election.name}</td>
                                    <td className="border-2 p-2">{election.votes.length}</td>
                                </tr>
                            )}</tbody>
                        </table>
                    </div>
                </div>
                <div className="">
                    <h2 className="text-4xl font-bold mb-4">Enroll in Elections: </h2>
                    <div className="carousel max-w-xl space-x-4 rounded-box">{
                        unregisteredElection.map((election, index) => 
                            <div key={index} className="carousel-item"> 
                                <ElectionCard {...election} userId={candidate.id} /> 
                            </div>
                        )  
                    }</div>
                </div>
            </section>
        </div>
    )
}

export async function VoterDetails({id}) {
    const voter = await getVoterDetails(id);
    return (
        <header className="flex items-start space-x-4">
            <h1 className="font-bold mb-4 text-5xl flex-1">{voter.name} <br />  <button className="btn mb-12 text-md">Area Code: <div className="badge">{voter.areaCode}</div></button></h1>
            <DeleteButton type="voter" id={voter.id} redirect={'/'}/>
            <button className="btn btn-primary">Edit...</button>
        </header>
    )
};

export async function NotVotedElections({id}){
    const elections = await getNotVotedElections(id)
    return elections.map((election, index) => <div key={index} className="carousel-item"> <ElectionCard {...election} userId={id} /> </div>
    )
}

export async function VoterVotes({id}){
    const votes = await getVoterVotes(id);
    return votes.map((vote, index) => 
        <li key={index} className="flex btn"> Voted for {vote.candidate.name} in {vote.election.name} </li>
    )
}

export async function VoterCandidates({voterID, electionID}){
    const {election, candidates} = await getVoterCandidates(parseInt(voterID), parseInt(electionID));
    return (
        <div className="p-8">
            <header className="flex items-center justify-between">
                <h1 className="text-5xl font-bold mb-4">{election.name}</h1>
            </header>
            <section className="p-4">
                <h2 className="text-xl font-bold mb-4">Candidates</h2>
                <ul className="grid gap-2 max-w-md">
                    {candidates.map((candidate, index) => <li key={index} className="bg-base-200 rounded-full p-4 flex items-center justify-between"> 
                        <h3 className="text-xl">{candidate.name} </h3>
                        <VoteButton voterID={voterID} electionID={electionID} candidateID={candidate.id} /> 
                    </li>)}
                </ul>
            </section>
        </div>
    )
}