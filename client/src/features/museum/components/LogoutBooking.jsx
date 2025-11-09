import React from 'react';
import { Link } from 'react-router-dom';
import { BiLock } from 'react-icons/bi';

const LogoutBooking = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-20">
            <div className="relative w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 transition-all duration-300">
                <img
                    src="https://heritagehubimages.s3.us-east-2.amazonaws.com/uploads/f9747a4f-3a2e-4169-9e60-70f2895eb2b6"
                    alt="Sarnath Museum"
                    className="w-full h-72 object-cover scale-100 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-center items-center text-center px-8 py-12">
                    <BiLock className="mb-6 animate-bounce" size={64} color="#fff" />
                    <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-xl tracking-wide">
                        Login To Book Your Visit
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded mb-8"></div>
                    <Link to="/login">
                        <button className="py-3 px-10 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-200">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LogoutBooking;