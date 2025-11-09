import React, { useState } from 'react'
import LoginPassword from './LoginPassword'
import Email from './otpLogin/Email'
import { Link, Navigate } from 'react-router-dom'
import Googlebtn from '../Googlebtn'
import Header from '../Navbar'
import { useGetUserQuery } from '../authApi'
import AuthorLoading from '../../../../../author/src/features/components/AuthorLoading'
import ClientLoading from '../../ClientLoading'

const LoginDefault = () => {

    const [component, setComponent] = useState("default")
    const { data, isLoading } = useGetUserQuery();

    if (data) {
        return <Navigate to='/' replace />
    }

    if (isLoading) {
        return <ClientLoading />;
    }

    return (
        <>
            <Header value="Register" />
            <div id="AuthContainer" className="min-h-[calc(100vh-64px)] min-w-[300px] p-4 flex flex-col justify-center items-center bg-gray-50 mt-[64px]">
                {component === "default" ?
                    <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
                        <div className="space-y-4">
                            <button onClick={() => setComponent("otpLogin")}
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex justify-center items-center">
                                <span>Login with OTP</span>
                            </button>

                            <button onClick={() => setComponent("passwordLogin")}
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex justify-center items-center">
                                <span>Login with Password</span>
                            </button>
                            <p className="text-center text-sm text-gray-600">
                                Don't have an account?
                                <Link to='/register'>
                                    <button className="ml-1 font-medium text-blue-600 hover:text-blue-800">Register</button>
                                </Link>
                            </p>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>
                            <Googlebtn />
                        </div>


                    </div>


                    : component === "otpLogin" ? <Email setComponent={setComponent} /> : component === "passwordLogin" && <LoginPassword setComponent={setComponent} />
                }
            </div>
        </>
    )
}

export default LoginDefault
