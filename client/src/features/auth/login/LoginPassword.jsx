import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Googlebtn from '../Googlebtn';
import { useLoginMutation } from '../authApi';

const LoginPassword = ({ setComponent }) => {

    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const [LoginFrom, setLoginFrom] = useState({
        email: "",
        password: "",
    })

    const [login, { isLoading: loading }] = useLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(LoginFrom).unwrap().then((data) => {
            setToken(data.result.token);
            navigate('/');
        });
    }

    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token])


    const handlechange = (event) => {
        setLoginFrom({ ...LoginFrom, [event.target.name]: event.target.value });
    }

    return (
        <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            </div>

            <div className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700">Email
                            <span className='text-red-600'> *</span>
                        </label>
                        <input
                            value={LoginFrom.email}
                            onChange={handlechange}
                            type="email" id="email"
                            name="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700">Password
                            <span className='text-red-600'> *</span>
                        </label>
                        <input
                            value={LoginFrom.password}
                            onChange={handlechange}
                            type="password" id="password"
                            name="password"
                            minLength={5}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <label
                                htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember me</label>
                        </div>
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex justify-center items-center">
                        {loading ?
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"
                                    ></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Signing in...
                            </>
                            : "Sign in"
                        }

                    </button>
                </form>
            </div>

            <p className="text-center text-sm text-gray-600">
                Don't have an account?
                <Link to='/register'>
                    <button className="ml-1 font-medium text-blue-600 hover:text-blue-800">Register</button>
                </Link>

            </p>
            <button onClick={() => setComponent("default")} type="button" className="w-full text-sm text-gray-600 hover:text-gray-800">
                ← Back to login options
            </button>
        </div>
    )
}

export default LoginPassword
