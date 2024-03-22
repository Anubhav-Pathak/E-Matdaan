"use client";

import Image from 'next/image';
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const WebCam = (props) => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const image = webcamRef.current.getScreenshot();
    props.image[1](image);
  }, [webcamRef, props.image]);
  
  return (
    <div className="max-w-sm grid gap-2">
      {props.image[0] ? 
      <figure className='relative'>
        <Image src={props.image[0]} alt="Captured Image" width={384} height={384}/>
        <figcaption className='btn btn-circle btn-primary absolute top-2 left-2' onClick={()=>props.image[1](null)}><Image src="/repeating.png" alt='Repeat' width={30} height={30} /> </figcaption>
      </figure>
      :
      <div className='relative'>
        <Webcam ref={webcamRef} muted={true}/>
        <button className='btn btn-circle absolute top-2 left-2' onClick={capture}><Image src="/capture.png" alt='Capture' width={30} height={30} /></button>
      </div>
      }
    </div>
  );
};

export default WebCam;