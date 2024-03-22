import React from 'react'
import Stats from './ui/Stats'

const ElectionCard = ({name, date, candidates, voters, votes}) => {
  return (
    <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>Happening In - {date}</p>
            <div className="card-actions justify-end">
                <Stats title="Candidates" value={candidates.length()}/>
                <Stats title="Voters" value={voters.length()} />
                <Stats title="Votes" value={votes.length()} />
            </div>
        </div>
    </div>
  )
}

export default ElectionCard