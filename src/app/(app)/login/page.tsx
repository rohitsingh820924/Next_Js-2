'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ShowPassword from '@/app/components/ShowPassword'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    // API call
    try {
      const response = await axios.post("/api/login", user);
      console.log(response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error:any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    }

    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <div className='h-svh w-svw flex items-center justify-center'>
      <div className='max-w-[400px] w-full bg-white p-5 rounded-2xl drop-shadow-lg'>
          <h1 className='text-center text-3xl font-bold mb-5'>Login</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-1 mb-5'>
                <label htmlFor="email" className='font-semibold text-sm'>Email</label>
                <input
                  type="email"
                  className='w-100 pr-4 py-1 border-b outline-none text-sm'
                  value={user.email}
                  placeholder='Enter Email'
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className='flex flex-col gap-1 mb-5 relative'>
                <label htmlFor="password" className='font-semibold text-sm'>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className='w-100 pr-4 py-1 border-b outline-none text-sm'
                  value={user.password}
                  placeholder='Enter Password'
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                 <div onClick={()=>setShowPassword(!showPassword)} className='absolute right-2 bottom-2'>
                <ShowPassword showPassword={showPassword} />
              </div>
              </div>
              <div>
                <button type="submit" className='py-1 w-full text-center bg-sky-800 text-white font-semibold rounded'>Submit</button>
              </div>
              <p className='text-center mt-3 text-xs'>Do Not Have An Account, <Link href="/signup" className='text-sky-800 underline'>Signup</Link>.</p>
            </form>
          </div>
        </div>
    </div>
  );
};

export default Login;
