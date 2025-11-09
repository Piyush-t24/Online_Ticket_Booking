import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import OTP from './OTP';
import { ToastContainer, toast } from 'react-toastify';
import { useSendOTPLoginMutation } from '../../authApi';

const Email = ({ setComponent }) => {

    const [newComponent, setNewComponent] = useState("email");
    const [email, setEmail] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const [sendOTPLogin, { isLoading: loading, isError, error }] = useSendOTPLoginMutation();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        sendOTPLogin(email).unwrap()
            .then(() => {
                setNewComponent("OTP");
            })
    }

    useEffect(() => {
        if (isError) {
            toast.error(error.data.error || error.data.message || "Failed to send OTP. Please try again.");
        }
    }, [isError]);

    return (
        <>
            {newComponent === "email" ?
                <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">Email Verification</h2>
                    <form onSubmit={handleSendOTP} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input value={email} onChange={handleEmail} placeholder='Enter email' type="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <button disabled={loading} type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex justify-center items-center">
                            {loading ?
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"
                                        ></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    Sending OTP...
                                </>
                                : "Verify Email"
                            }
                        </button>
                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?
                            <Link to='/register'>
                                <button className="ml-1 font-medium text-blue-600 hover:text-blue-800">Register</button>
                            </Link>

                        </p>
                        <button onClick={() => setComponent("default")} type="button" className="w-full text-sm text-gray-600 hover:text-gray-800">
                            ← Back to login options
                        </button>
                    </form>
                </div>
                :
                newComponent === "OTP" &&
                <OTP email={email} setNewComponent={setNewComponent} />
            }

        </>
    )
}

export default Email
