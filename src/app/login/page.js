"use client";

import React, {useRef, useState} from 'react'

import useLoadingStore from '@/store/LoadingStore';
import WebCam from '@/components/Webcam'
import Input from '@/components/ui/Input'
import useUserStore from '@/store/UserStore';
import { useRouter } from 'next/navigation';

const Page = () => {

  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState('');
  const emailRef = useRef(null);
  const {loadingStates, setLoadingState} = useLoadingStore();
  const {setUser} = useUserStore();
  const router = useRouter();

  const submithandler = async (e) => {
    setLoadingState('login', true);
    e.preventDefault();

    const email = emailRef.current.value;

    if (!email) {
      setError('Email is required');
      setLoadingState('login', false);
      return;
    }

    const voterImage = imageSrc;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('voterImage', voterImage);

    const response = await fetch('/api/auth', {
      method: 'POST',
      body: formData
    });
    const {message} = await response.json();
    if (!response.ok) {
      setError(message); 
    } else {
      await setUser(message);
      router.push(`/dashboard/voter/${message.id}`);
    }    
    setLoadingState('login', false);
  }
  
  return (
    <div className="hero min-h-screen bg-neutral">
        <form className="p-4 grid gap-4 shadow-2xl rounded-lg text-center" onSubmit={submithandler}>
            <h1 className='card-title'>Login</h1>
            {error && <p className="text-error">{error}</p>}
            <Input ref={emailRef} type="email" name="email" placeholder="Email" label="Email" />
            <WebCam image={[imageSrc, setImageSrc]}/>
            {imageSrc && <button className='btn btn-primary'>{loadingStates['login'] ? <span className="loading loading-spinner loading-md"></span> : "Login"}</button>}
        </form>
    </div>
  )
}

export default Page