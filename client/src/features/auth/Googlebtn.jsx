import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Googlebtn = () => {
    const navigate = useNavigate();
    const responseGoogle = async (authResult)=>{
        try {
            if (authResult['code']) {
                const response = await fetch(
                    `${import.meta.env.VITE_HOST}/auth/google`,{
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: JSON.stringify({code: authResult['code']}),
                    }
                );
                if (response.status != 201) {
                    console.log(response);
                    throw new Error('Login failed!')
                }

                navigate('/');
                
            }
        } catch (error) {
            console.log(error);
        }
        
    }
    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code',
    });

    return (
        <button
            onClick={() => googleLogin()}  // ✅ Ensure it's triggered by a user action
            className="flex items-center justify-center w-full max-w-sm py-2 text-lg font-medium text-gray-700 bg-white border border-gray-300 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition rounded-full">
            <FcGoogle className="text-2xl mr-3" />
            Sign in with Google
        </button>
    );
};

export default Googlebtn;
