"use client";

import { addElection } from '@/utils/actions';

import Modal from './ui/Modal';
import Input from './ui/Input';
import Form from './ui/Form';

const ElectionModal = () => {
  return (
    <Modal id='election-modal'>
      <Form 
        action={addElection} 
        initialState={{error: null}} 
        style='grid grid-cols-2 gap-4' 
        button={{
          text: "Add Elections",
          style: "btn btn-primary col-span-full"
        }}
      >
        <p className='text-info col-span-full'>Election Name must be unique</p>
        <Input type='text' name="name" label='Election Name' styles="col-span-full" />
        <div>
          <p className='text-sm mb-2'>Start Date</p>
          <Input type='date' name="start_date" label='Election Start Date' />
        </div>
        <div>
          <p className='text-sm mb-2'>End Date</p>
          <Input type='date' name="end_date" label='Election Start Date' />
        </div>
      </Form>
    </Modal>
  )
}

export default ElectionModal;