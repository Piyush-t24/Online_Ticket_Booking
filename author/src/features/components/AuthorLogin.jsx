import React, { useState, useEffect } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useNavigate, Navigate } from 'react-router-dom';
import { useGetAuthorDetailsQuery, useLoginAuthorMutation } from '../authorApi';
import AuthorLoading from './AuthorLoading';

const AuthorLogin = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState("")
    const [LoginFrom, setLoginFrom] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    // console.log(LoginFrom)
    const handlechange = (event) => {
        setLoginFrom({ ...LoginFrom, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token])

    const [login, { isLoading: isLoggingAuthor }] = useLoginAuthorMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(LoginFrom).unwrap().then((data) => {
            setToken(data.token);
            navigate('/');
        }).catch((error) => {
            toast.error(error.data?.message || error.data?.error || 'Error logging in');
        });
    }

    const { data, isLoading: isGettingAuthorDetails } = useGetAuthorDetailsQuery();

    if (data) {
        return <Navigate to="/" replace />;
    }

    if (isGettingAuthorDetails) {
        return <AuthorLoading />;
    }

    return (
        <div id="AuthContainer" className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
                <div className="text-center flex items-center justify-center gap-3">
                    <img src="heritageHub.png" width={25} alt="img" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Author Login</h1>
                </div>

                <div className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email
                                <span className='text-red-600'> *</span>
                            </label>
                            <input
                                value={LoginFrom.email}
                                onChange={handlechange}
                                type="email" id="email"
                                name="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password
                                <span className='text-red-600'> *</span>
                            </label>
                            <div className="relative">
                                <input
                                    value={LoginFrom.password}
                                    onChange={handlechange}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    minLength={5}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600 dark:text-gray-300 focus:outline-none"
                                    tabIndex={-1}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" />
                                <label
                                    htmlFor="remember" className="ml-2 text-sm text-gray-700 dark:text-gray-200">Remember me</label>
                            </div>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Forgot password?</a>
                        </div>

                        <button type="submit"
                            disabled={isLoggingAuthor}

                            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800 ${isLoggingAuthor ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            {isLoggingAuthor ? 'Logging in...' : 'Log in'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthorLogin
