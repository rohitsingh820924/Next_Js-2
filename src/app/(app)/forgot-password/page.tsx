'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    // API call
    try {
      const response = await axios.post("/api/forgot-password", {email});
      console.log(response.data);
      toast.success("Reset mail sent");
      alert("Reset Email Sent, Check Your Inbox");
    } catch (error:any) {
      console.log("Forgot password failed", error.message);
      toast.error(error.message);
    }

    setEmail("");
  };

  const handleReset = async () => {
    try {
      
    } catch (error:any) {
      
    }
  }

  return (
    <div className='h-svh w-svw flex items-center justify-center'>
      <div className='max-w-[400px] w-full bg-white p-5 rounded-2xl drop-shadow-lg'>
          <h1 className='text-center text-3xl font-bold mb-5'>Forgot Password</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="email" className='font-semibold text-sm'>Email</label>
                <input
                  type="email"
                  className='w-100 pr-4 py-1 border-b outline-none text-sm'
                  value={email}
                  placeholder='Enter Email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <button type="submit" className='py-1 w-full text-center bg-sky-800 text-white font-semibold rounded'>Submit</button>
              </div>
              <p className='text-center mt-3 text-xs'>Back to login <Link href="/login" className='text-sky-800 underline'>Login</Link>.</p>
            </form>
          </div>
        </div>
    </div>
  );
};

export default ForgotPassword;
