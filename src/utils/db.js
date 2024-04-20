import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getElections = async () => {
    const electons =  await prisma.election.findMany({
        include: {
            candidates: true,
            voters: true,
            votes: true
        }
    });
    await prisma.$disconnect();
    return electons;
}

export const getStats = async () => {
    const n_elections = await prisma.election.count();
    const n_candidates = await prisma.candidate.count();
    const n_voters = await prisma.voter.count();
    const n_votes = await prisma.vote.count();
    await prisma.$disconnect();
    return {n_elections, n_candidates, n_voters, n_votes};
}

export const getElection = async ({id}) => {
    const election = await prisma.election.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            candidates: true,
            voters: true,
            votes: {
                include: {
                    voter: true,
                    candidate: true
                }
            }
        }
    });
    await prisma.$disconnect();
    return election;
}

export const getCandidate = async ({id}) => {
    const candidate = await prisma.candidate.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            votesReceived: true
        }
    });
    const registeredElection = await prisma.election.findMany({
        where: {
            candidates: {
                some: {
                    id: parseInt(candidate.id)
                }
            }
        },
        include: {
            votes: true
        }
    });
    const unregisteredElection = await prisma.election.findMany({
        where: {
            candidates: {
                none: {
                    id: parseInt(candidate.id)
                }
            }
        }
    });
    await prisma.$disconnect();
    return {candidate, registeredElection, unregisteredElection};
}

export const getVoterDetails = async (id) => {
    const voter = await prisma.voter.findUnique({
        where: {
            id: parseInt(id)
        },
    });
    await prisma.$disconnect();
    return voter;
}
export const getNotVotedElections = async (id) => {
    const notVotedElections = await prisma.election.findMany({
        where: {
            votes: {
                none: {
                    voterID: parseInt(id)
                }
            }
        }
    });
    await prisma.$disconnect();
    return notVotedElections;
}
export const getVoterVotes = async (id) => {
    const votes = await prisma.vote.findMany({
        where: {
            voterID: parseInt(id)
        },
        include: {
            election: true,
            candidate: true
        }
    });
    await prisma.$disconnect();
    return votes;
}
export const getVoterCandidates = async (voterID, electionID) => {
    const election = await prisma.election.findUnique({where: {id: parseInt(electionID)},select: {name: true}})
    const voter = await prisma.voter.findUnique({where: {id: parseInt(voterID)}});
    const candidates = await prisma.candidate.findMany({
        where:{
            areaCode: voter.areaCode,
            election: {
                some: {
                    id: parseInt(electionID)
                }
            }
        }
    });
    await prisma.$disconnect();
    return {election, candidates};
}

export const getVoter = async ({id}) => {
    const voter = await prisma.voter.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            votes: true
        }
    });
    const votedElection = await prisma.vote.findMany({
        where: {
            voterID: parseInt(voter.id)
        },
        include: {
            election: true,
            candidate: true
        }
    })
    const notVotedElection = await prisma.election.findMany({
        where: {
            votes: {
                none: {
                    voterID: parseInt(voter.id)
                }
            }
        }
    });
    await prisma.$disconnect();
    return {voter, votedElection, notVotedElection};
};