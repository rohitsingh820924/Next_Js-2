'use client';
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const User = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing")
  const handleClick = async () => {
    try {
      await axios.get('/api/logout')
      console.log("Logout Successful");
      toast.success("Logout Successful");
      router.push('/login')
    } catch (error:any) {
      console.log("Logout failed", error.message);
      toast.error(error.message);
    }
  }

  const getData = async () => {
    const res = await axios.get('/api/me')
    console.log(res.data);
    setData(res.data.data.username)
  }

  useEffect(()=> {
    getData();
  })
  return (
    <div className='h-svh w-svw'>
      <h2>{data ? `${data}` : "nothing"}</h2>
      <button className='p-2 bg-sky-800 text-white rounded absolute right-5 top-5 text-xs font-semibold' onClick={handleClick}>LogOut</button>
    </div>
  )
}

export default User