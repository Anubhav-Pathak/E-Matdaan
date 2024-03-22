"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

import useToastStore from '@/store/ToastStore';
import useLoadingStore from '@/store/LoadingStore';

import Input from "@/components/ui/Input";
import Toast from "@/components/ui/Toast";

const Register = () => {

  const searchParams = useSearchParams()
  const user = searchParams.get('user')

  const addToast = useToastStore((state) => state.addToast);
  const { loadingStates, setLoadingState } = useLoadingStore();
  const [error, setError] = useState('');

  const nameRef = useRef();
  const emailRef = useRef();
  const contactRef = useRef();
  const areaCodeRef = useRef();
  const [voterImage, setVoterImage] = useState(null);

  const handleChange = (e) => {
    setVoterImage(e.target.files[0]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!nameRef.current.value || !emailRef.current.value || !contactRef.current.value || !areaCodeRef.current.value){
      setError('All fields are required')
      return;
    }
    
    setLoadingState("register-form", true)

    const formData = new FormData();
    formData.append('name', nameRef.current.value);
    formData.append('email', emailRef.current.value);
    formData.append('contact', contactRef.current.value);
    formData.append('areaCode', areaCodeRef.current.value);
    formData.append('user', user);
    if(user == 'voter') formData.append('voterImage', voterImage);
    
    const response = await fetch('/api/register', {
      method: 'POST',
      body: formData
    })
    const {message} = await response.json();
    if(!response.ok) addToast({message: message, type: 'error'})
    else addToast({message: message, type: 'success'})
  
    setLoadingState("register-form", false)
  }
  

  const handleCancel = () => {
    nameRef.current.value = '';
    emailRef.current.value = '';
    contactRef.current.value = '';
    areaCodeRef.current.value = '';
  }

  return (
    <main className="min-h-screen flex items-center justify-between">
      <form className="gap-4 grid grid-cols-2 mx-auto" onSubmit={handleSubmit}>
        <Input ref={nameRef} type="text" label="Full Name" styles="col-span-full" />
        <Input ref={emailRef} type="email" label="Email" styles="col-span-full"/>
        <Input ref={contactRef} type="tel" label="Contact" />
        <Input ref={areaCodeRef} type="number" label="Area Code" />
        {user == 'voter' && <input type="file" onChange={handleChange} className="file-input file-input-bordered file-input-secondary w-full max-w-xs col-span-full" />}
        <div>
          <button type="submit" className="btn btn-primary mr-4">{loadingStates["register-form"] ? <span className="loading loading-spinner loading-md"></span> : "Save"}</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
        <p className="text-right self-center text-error">{error}</p>
      </form>
      <aside className="">
      </aside>
      <Toast />
    </main>
  );
}

export default Register;