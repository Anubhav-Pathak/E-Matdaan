"use client";

import { addCandidate } from '@/utils/actions';

import Modal from './ui/Modal';
import Form from './ui/Form';

const ElectionModal = () => {
  return (
    <Modal id='candidate-modal'>
      <Form 
        action={addCandidate} 
        initialState={{error: null}} 
        style='grid gap-4' 
        button={{
          text: "Add Candidate",
          style: "btn btn-primary col-span-full"
        }}
      >
        <label className="input input-bordered flex items-center gap-2"> Name
            <input type="text" className="grow" name='name' pattern='[A-Za-z ]{1,32}' required />
        </label>
        <label className="input input-bordered flex items-center gap-2"> Area Code
            <input type="text" className="grow" name='areaCode' pattern='[0-9]{2}' />
        </label>
      </Form>
    </Modal>
  )
}

export default ElectionModal;