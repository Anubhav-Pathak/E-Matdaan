"use client";

import { useState } from "react";
import Link from "next/link";
import Form from "@/components/ui/Form";
import WebCam from "@/components/Webcam";
import {login} from "@/utils/actions";

export default function Home(){

  const [image, setImage] = useState(undefined);

  return (
    <main className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now to <span className="text-primary"> E-Matdaan </span> ! </h1>
          <p className="py-6">Empower your voice with E-Matdaan, your gateway to digital democracy. Join our platform to engage in meaningful discussions, cast your votes, and shape the future. Make your voice count – sign in today and be a part of the democratic process like never before.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border-2">
          <div role="tablist" className="tabs tabs-bordered">
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Voter" defaultChecked/>
            <div role="tabpanel" className="tab-content">
              <Form 
                action={login} 
                initialState={{error: null}} 
                style="card-body" 
                button={{text:'Login', style:'btn btn-primary'}}  
                onSubmit={(formdata)=>formdata.append('profile', image)}
              >
                <Link href="/register?user=voter" className="text-secondary hover:underline mb-4 text-sm self-end">Dont have an account ? Register</Link>
                <label className="input input-bordered flex items-center gap-2"> Aadhar:
                  <input type="text" name="aadhar" className="grow" pattern="[0-9]{12}"/>
                </label>
                <label className="form-control w-full max-w-xs col-span-full">
                  <div className="label">
                    <span className="label-text">Upload your Face Photo</span>
                  </div>
                  <WebCam image={image} setImage={setImage}/>
                </label>
              </Form>
            </div>
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Candidate"/>
            <div role="tabpanel" className="tab-content">
              <Form action={login} initialState={{error: null}} style="card-body" button={{text:'Login', style:'btn btn-primary'}}>
                <Link href="/register?user=candidate" className="text-secondary hover:underline mb-4 text-sm self-end">Dont have an account ? Register</Link>
                <label className="input input-bordered flex items-center gap-2"> Key:
                  <input type="text" name="passkey" className="grow" />
                </label>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}