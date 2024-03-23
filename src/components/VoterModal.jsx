import React, {useState, useEffect, use} from 'react'

import Modal from './ui/Modal'

import useToastStore from '@/store/ToastStore'
import useLoadingStore from '@/store/LoadingStore'

import useUserStore from '@/store/UserStore'

const VoterModal = ({id}) => {

    const [candidates, setCandidates] = useState([]);
    const {loadingStates ,setLoadingState} = useLoadingStore();
    const {addToast} = useToastStore();

    const {user} = useUserStore();

    useEffect(() => {
        (async () => {
            const response = await fetch('/api/elections/candidates', { method: 'GET' });
            const data = await response.json();
            if (!response.ok) {
                addToast({ message: data.message, type: 'error' });
                return;
            }
            setCandidates(data);
        })();
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingState('elections-register', true);
        const candidateId = e.target.candidate.value;
        const electionId = id;
        const voterId = user.id;
        const response = await fetch('/api/elections/vote', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({candidateId, electionId, voterId}) 
        });
        const {message} = await response.json();
        if (!response.ok) {
            addToast({ message: message, type: 'error' });
            setLoadingState('elections-register', false);
            return;
        }
        addToast({message: message, type: 'success'});
        setLoadingState('elections-register', false);
    }

  return (
    <Modal id='voter-modal'>
        <h1 className="text-3xl font-bold">Candidates</h1>
        <form onSubmit={submitHandler}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Select Candidate</span>
                </label>
                <select className="select select-bordered w-full mb-4" id="candidate" name="candidate">
                    {
                        candidates.map((candidate, index) => <option key={index} value={candidate.id}>{candidate.name}</option>)
                    }
                </select>
            </div>
            <div className="form-control">
                <button className="btn btn-primary">Vote</button>
            </div>
        </form>
    </Modal>
  )
}

export default VoterModal;