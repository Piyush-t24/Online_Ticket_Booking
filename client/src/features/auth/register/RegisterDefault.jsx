import React, { useState } from 'react';
import OTP from './OTP';
import Register from './Register';
import Header from '../Navbar';
import { useGetUserQuery } from '../authApi';
import { Navigate } from 'react-router-dom';
import ClientLoading from '../../ClientLoading';

const RegisterDefault = () => {

    const [component, setComponent] = useState("Register");
    const { data, isLoading } = useGetUserQuery();

    if (data) {
        return <Navigate to='/' replace />;
    }

    if (isLoading) {
        return <ClientLoading />;
    }

    return (
        <>

            <Header value="Login" />
            <div id="AuthContainer" className="min-h-[calc(100vh-64px)] min-w-[300px] p-4 flex flex-col justify-center items-center bg-gray-50 mt-[64px]">
                {(() => {
                    switch (component) {
                        case 'OTP':
                            return <OTP setComponent={setComponent} />;
                        case 'Register':
                            return <Register setComponent={setComponent} />
                        default:
                            return <Register setComponent={setComponent} />;
                    }
                })()}
            </div>
        </>
    );
};

export default RegisterDefault;
