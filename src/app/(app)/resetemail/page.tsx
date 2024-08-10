"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ShowPassword from '@/app/components/ShowPassword'


const ResetPassword = () => {
    const [token, setToken] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [newPassword, setNewPassword] = useState("");
    const router = useRouter();

    const RestUserPassword = async (event: any) => {
        event.preventDefault();
        try {
            const res = await axios.post('/api/resetemail', { token, newPassword });
            router.push("/login");
        } catch (error: any) {
            console.error(error.response?.data || "An error occurred"); // Fixed typo and added a fallback
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []); // Added dependency



    return (
        <div className='h-svh w-svw flex items-center justify-center'>
            <div className='max-w-[600px] w-full bg-white p-5 rounded-2xl drop-shadow-lg text-center'>
                <h1 className='text-center text-3xl font-bold mb-5'>Reset Password</h1>
                <h2 className='inline-block mx-auto py-2 px-3 bg-slate-600 rounded text-xs text-white'>
                    {token ? `${token}` : "No Token"}
                </h2>
                <div>
                <form onSubmit={RestUserPassword}>
              <div className='flex flex-col gap-1 mb-5 relative'>
                <label htmlFor="password" className='font-semibold text-sm text-start'>New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className='w-100 pr-4 py-1 border-b outline-none text-sm'
                  value={newPassword}
                  placeholder='Enter New Password'
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                 <div onClick={()=>setShowPassword(!showPassword)} className='absolute right-2 bottom-2'>
                <ShowPassword showPassword={showPassword} />
              </div>
              </div>
              <div>
                <button type="submit" className='py-1 w-full text-center bg-sky-800 text-white font-semibold rounded'>Submit</button>
              </div>
            </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
