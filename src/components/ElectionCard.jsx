"use client";

import Stats from './ui/Stats';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { enroll, vote } from "@/utils/actions";

const ElectionCard = ({id, name, startdate, enddate, candidates, voters, votes, userId}) => {

  const path = usePathname();
  const isAdmin = path.includes('admin');
  const isCandidate = path.includes('candidate');
  const isVoter = path.includes('voter');

  const [countDown, setCountDown] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const startDate = new Date(startdate);
    const endDate = new Date(enddate);
    if(currentDate < startDate){
      setText('Starts in');
      setCountDown(Math.floor((startDate - currentDate) / (1000 * 60 * 60 * 24)));
    } else if(currentDate > startDate && currentDate < endDate){
      setText('Ends in');
      setCountDown(Math.floor((endDate - currentDate) / (1000 * 60 * 60 * 24)));
    } else {
      setText('Ended');
    }
  }, [startdate, enddate]);

  return (
    <div className="card w-96 h-72 bg-base-200 border-neutral border">
      <div className="card-body relative">
        <div className='flex items-start justify-between'>
          <h2 className="card-title">{name}</h2>
          <div className="flex flex-col text-xs p-1 bg-neutral rounded">
            {text}
            <span className="countdown font-mono text-xl">
              <span style={{"--value":countDown}}></span>
            </span>
            days
          </div> 
        </div>
        {
          isAdmin && <div className="flex"> 
            <Stats title="Candidates" value={candidates?.length}/>
            <Stats title="Voters" value={voters?.length} />
            <Stats title="Votes" value={votes?.length} />
          </div>  
        }
        { isAdmin && <Link href={`/admin/election/${id}`} className='btn btn-primary'>View</Link> }
        { isCandidate && <button className='btn btn-primary absolute bottom-8' onClick={async () => await enroll(parseInt(id), parseInt(userId))}> Enroll </button>}
        { isVoter && <Link href={`${userId}/vote?electionID=${id}`} className='btn btn-primary absolute bottom-8' > Vote </Link>}
      </div>
    </div>
  )
}

export default ElectionCard