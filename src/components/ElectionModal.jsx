import React from 'react'

import Modal from './ui/Modal'
import Input from './ui/Input'

import useToastStore from '@/store/ToastStore'
import useLoadingStore from '@/store/LoadingStore'

const ElectionModal = () => {

    const nameRef = React.useRef(null);
    const startDateRef = React.useRef(null);
    const endDateRef = React.useRef(null);

    const {loadingStates ,setLoadingState} = useLoadingStore();
    const {addToast} = useToastStore();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingState('elections-register', true);
        const name = nameRef.current.value;
        const startDate = startDateRef.current.value;
        const endDate = endDateRef.current.value;
        const response = await fetch('/api/register/elections', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, startDate, endDate}) 
        });
        const {message} = await response.json();
        if (!response.ok) {
            addToast({message, type: 'error'});
            return;
        }
        addToast({message, type: 'success'});
        setLoadingState('elections-register', false);
    }

  return (
    <Modal id='election-modal'>
        <form onSubmit={submitHandler} className='grid grid-cols-2 gap-4'>
            <p className='text-info col-span-full'>Election Name must be unique</p>
            <Input ref={nameRef} type='text' label='Election Name' styles="col-span-full" />
            <div>
                <p className='text-sm mb-2'>Start Date</p>
                <Input ref={startDateRef} type='date' label='Election Start Date' />
            </div>
            <div>
                <p className='text-sm mb-2'>End Date</p>
                <Input ref={endDateRef} type='date' label='Election Start Date' />
            </div>
            <button type='submit' className='btn btn-primary col-span-full'>{loadingStates['elections-register'] ? <span className="loading loading-spinner loading-md"></span> : "Add Elections"}</button>
        </form>
    </Modal>
  )
}

export default ElectionModal;