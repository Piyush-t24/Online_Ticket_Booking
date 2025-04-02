import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContextUserInfo } from '../../context/context';
import { ToastContainer, toast } from 'react-toastify';
import Googlebtn from '../Googlebtn';

const Register = ({setComponent}) => {

    const { userInfo, setUserInfo } = useContext(ContextUserInfo);
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const handlechange = (event) => {
        setUserInfo({
            ...userInfo,
            name: {
                ...userInfo.name,
                [event.target.name]: event.target.value,
            },
            [event.target.name]: event.target.value,
        });
    }
    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (userInfo.password !== userInfo.confirmPassword) {
            toast.warning("Passwords do not match!");
            return;
        }
        // console.log({ name: { firstname: userInfo.firstname, lastname: userInfo.lastname }, email: userInfo.email, password: userInfo.password })
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_HOST}/user/generate-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ email: userInfo.email }),
                credentials: "include"
            });
            if (!response.ok) {
                const err = await response.json();
                throw err;
            }

            setUserInfo({ ...userInfo, otpStatus: true });
            setComponent("OTP");
        } catch (error) {
            console.log(error);
            toast.error(error.error || "Something went wrong!");
        } finally {

            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
                <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-xl shadow-lg">
                    <div className="text-center space-y-1">
                        <h2 className="text-xl font-bold text-gray-900">Welcome To Heritage Hub</h2>
                        <p className="text-gray-600">Create a new account</p>
                    </div>

                    <form onSubmit={handleSendOTP} className="space-y-4">
                        <div className="flex gap-2">
                            <div>
                                <label
                                    htmlFor="firstname"
                                    className="block text-sm font-medium text-gray-700">First Name
                                    <span className='text-red-600'> *</span>
                                </label>
                                <input
                                    value={userInfo.name.firstname}
                                    onChange={handlechange} type="firstname"
                                    id="firstname"
                                    name="firstname"
                                    minLength={3}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required />
                            </div>
                            <div>
                                <label
                                    htmlFor="lastname"
                                    className="block text-sm font-medium text-gray-700">Last Name
                                    <span className='text-red-600'> *</span>
                                </label>
                                <input
                                    value={userInfo.name.lastname}
                                    onChange={handlechange} type="lastname"
                                    id="lastname"
                                    name="lastname"
                                    minLength={3}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required />
                            </div>
                        </div>

                        {/* email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700">Email
                                <span className='text-red-600'> *</span>
                            </label>
                            <input
                                value={userInfo.email}
                                onChange={handlechange}
                                type="email" id="email"
                                name="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required />
                        </div>
                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password
                                <span className='text-red-600'> *</span>
                            </label>
                            <div className="relative">
                                <input
                                    placeholder='Enter Password'
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    minLength={5}
                                    required
                                    value={userInfo.password}
                                    onChange={handlechange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => togglePasswordVisibility('password')}
                                >
                                    {showPassword ? '👁️' : '🔒'}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password
                                <span className='text-red-600'> *</span>
                            </label>
                            <div className="relative">
                                <input
                                    placeholder='Confirm Password'
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    minLength={5}
                                    required
                                    value={userInfo.confirmPassword}
                                    onChange={handlechange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => togglePasswordVisibility('confirmPassword')}
                                >
                                    {showConfirmPassword ? '👁️' : '🔒'}
                                </button>
                            </div>
                        </div>


                        {/* Send OTP button */}
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
                    </form>
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?
                        <Link to='/login'>
                            <button className="ml-1 font-medium text-blue-600 hover:text-blue-800">Log in</button>
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
        </>
    )

}

export default Register
