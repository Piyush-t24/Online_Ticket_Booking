import React from 'react';
import { Link } from 'react-router-dom';
import { BiLock } from 'react-icons/bi';

const LogoutBooking = () => {
    return (
        <div className="relative flex justify-center items-center">
            <div className="group relative overflow-hidden rounded-lg shadow-lg Up">
                <img
                    src="https://heritagehubimages.s3.us-east-2.amazonaws.com/uploads/f9747a4f-3a2e-4169-9e60-70f2895eb2b6"
                    alt="Sarnath Museum"
                    className="w-full h-64 object-cover transform transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6">
                    <BiLock className='mb-4' size={50} color='white' />
                    <h2 className="text-2xl font-bold text-white mb-4">Login To Book Your Visit</h2>
                    <div className="w-24 h-1 bg-indigo-600 mb-6"></div>
                    <Link to="/login">
                        <button className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LogoutBooking;