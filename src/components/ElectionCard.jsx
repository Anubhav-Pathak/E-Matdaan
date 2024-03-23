import React from 'react'
import Stats from './ui/Stats'

const ElectionCard = ({id, name, startdate, enddate, candidates, voters, votes, isUser, electionId}) => {
  let remainingDays = Math.ceil((new Date(startdate) - new Date()) / (1000 * 60 * 60 * 24));
  remainingDays = remainingDays < 0 ? 0 : remainingDays;

  const clickHandler = (id) => {
    electionId(id);
    document.getElementById('voter-modal').showModal();
  }

  return (
    <div className="card w-96 h-80 bg-base-200 shadow-2xl border-neutral border">
        <div className="card-body relative">
            <div className='flex justify-between mb-4'>
              <h2 className="card-title">{name}</h2>
              <div className="radial-progress bg-neutral text-2xl text-center" style={{"--value":remainingDays}} role="progressbar">{remainingDays} <span className='text-xs'>days left</span></div>
            </div>
            {
              isUser ? <button className="btn btn-primary" onClick={() => clickHandler(id)}>View</button> 
              :
              <>             
                <p>Starts at: {new Date(enddate).toUTCString()}</p>
                <div className="flex">
                    <Stats title="Candidates" value={candidates?.length()}/>
                    <Stats title="Voters" value={voters?.length()} />
                    <Stats title="Votes" value={votes?.length()} />
                </div>
              </>
            }
        </div>
    </div>
  )
}

export default ElectionCard