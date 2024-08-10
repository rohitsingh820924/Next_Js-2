"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const VerifyEmail = () => {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false); // Fixed typo
    const [error, setError] = useState(false);

    const VerifyUserEmail = async () => {
        try {
            const res = await axios.post('/api/verifyemail', { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.error(error.response?.data || "An error occurred"); // Fixed typo and added a fallback
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []); // Added dependency

    useEffect(() => {
        if (token.length > 0) {
            VerifyUserEmail();
        }
    }, [token]);

    return (
        <div className='h-svh w-svw flex items-center justify-center'>
            <div className='max-w-[600px] w-full bg-white p-5 rounded-2xl drop-shadow-lg text-center'>
                <h1 className='text-center text-3xl font-bold mb-5'>Verify Email</h1>
                <h2 className='inline-block mx-auto py-2 px-3 bg-slate-600 rounded text-xs text-white'>
                    {token ? `${token}` : "No Token"}
                </h2>
                <div>
                    {verified && (
                        <div>
                            <h3>Email Verified</h3>
                            <Link href="/login">Login</Link>
                        </div>
                    )}

                    {error && (
                        <div>
                            <h3>Error Verifying Email</h3> {/* Added more descriptive text */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
