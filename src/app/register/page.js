"use client";
import { useState } from "react";
import WebCam from "@/components/Webcam";

import Form from "@/components/ui/Form";
import { registerVoter } from "@/utils/actions";

const Page = () => {

  const [image, setImage] = useState(null);

  return (
    <main className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
          <h1 className="text-xl text-primary font-bold p-4">E-Matdaan Register</h1>
          <Form 
            action={registerVoter} 
            initialState={{error: null}} 
            style="p-8 grid grid-cols-2 gap-2" 
            onSubmit={(formdata)=>formdata.append('profile', image)} 
            button={{text: "Register", style: "btn btn-primary"}}
          >
            <label className="input input-bordered flex items-center gap-2 col-span-full"> Name: <input type="text" name="name" className="grow" pattern="[A-Za-z]{1,32} [A-Za-z]{1,32}" /></label>
            <label className="input input-bordered flex items-center gap-2 col-span-full"> Aadhar: <input type="text" name="aadhar" className="grow" pattern="[0-9]{12}"/> </label>
            <label className="input input-bordered flex items-center gap-2"> Areacode: <input type="number" name="areaCode" className="grow" pattern="[0-9]{6}"/> </label>
            <label className="input input-bordered flex items-center gap-2 col-span-full"> Contact: <input type="text" name="contact" className="grow" pattern="[0-9]{10}"/> </label>
            <label className="form-control w-full max-w-xs col-span-full">
              <div className="label">
                <span className="label-text">Upload your Face Photo</span>
              </div>
              <WebCam image={image} setImage={setImage}/>
            </label>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default Page