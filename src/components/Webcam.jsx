"use client";

import Image from 'next/image';
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const WebCam = ({image, setImage}) => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const image = webcamRef.current.getScreenshot();
    setImage(image);
  }, [webcamRef, setImage]);
  
  return (
    <div className="max-w-sm grid gap-2">
      {image ? 
      <figure className='relative'>
        <Image src={image} alt="Captured Image" width={384} height={384} inputMode=''/>
        <figcaption className='btn btn-circle btn-primary absolute top-2 left-2' onClick={()=>setImage(null)}><Image src="/repeating.png" alt='Repeat' width={30} height={30} /> </figcaption>
      </figure>
      :
      <div className='relative'>
        <Webcam ref={webcamRef} muted={true}/>
        <figcaption className='btn btn-circle absolute top-2 left-2' onClick={capture}><Image src="/capture.png" alt='Capture' width={30} height={30} /></figcaption>
      </div>
      }
    </div>
  );
};

export default WebCam;