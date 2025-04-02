import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcPrevious } from 'react-icons/fc';
import { ContextUserInfo } from '../../context/context';
import { toast, ToastContainer } from 'react-toastify';
import Googlebtn from '../Googlebtn';

const OTP = ({ setComponent }) => {

    const navigate = useNavigate()
    const [timer, setTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const { userInfo, setUserInfo } = useContext(ContextUserInfo);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);


    const startTimer = () => {
        setIsTimerActive(true);
        setTimer(60);
    };

    useEffect(() => {
        if (userInfo.otpStatus) {
            startTimer();
            toast.success("OTP sent successfully!")
        }
    }, [userInfo.otpStatus])

    useEffect(() => {
        let interval;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timer]);

    const inputsRef = useRef([]);
    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setUserInfo({ ...userInfo, otpStatus: false });
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_HOST}/user/verify-otp`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: { firstname: userInfo.firstname, lastname: userInfo.lastname }, email: userInfo.email,
                    password: userInfo.password,
                    otp: otp.join("")
                })
            });
            if (!response.ok) {
                const err = await response.json();
                throw err;
            }
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async (e) => {
        e.preventDefault();
        setUserInfo({ ...userInfo, otpStatus: false })
        setResendLoading(true);

        // console.log({ name: { firstname: userInfo.firstname, lastname: userInfo.lastname }, email: userInfo.email, password: userInfo.password })
        try {
            const response = await fetch("http://localhost:3000/user/generate-otp", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: { firstname: userInfo.firstname, lastname: userInfo.lastname }, email: userInfo.email, password: userInfo.password })
            });
            if (!response.ok) {
                const err = await response.json();
                throw err;
            }
            startTimer();
            setUserInfo({ ...userInfo, otpStatus: true });
        } catch (error) {
            console.log(error);
            toast.error(error.message || error.error || "Something went wrong!")
        } finally {
            setResendLoading(false);
        }
    }

    return (
        <>
            <ToastContainer />
                <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-xl shadow-lg">
                    <div className="flex items-center justify-center  w-full">
                        {!isTimerActive && !resendLoading && !loading && <FcPrevious className='cursor-pointer' onClick={() => setComponent("Register")} />}

                        <h2 className="text-2xl font-bold text-center px-4">
                            OTP Verification
                        </h2>
                    </div>

                    <p className="text-center text-gray-600 mb-6">
                        Enter the verification code sent to your email
                    </p>
                    <form onSubmit={handleVerifyOTP}>
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={value}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            ))}
                        </div>

                        <div className="text-center mb-6">
                            <button type='button' disabled={resendLoading || isTimerActive} onClick={handleResendOTP} className="text-blue-600 hover:text-blue-800 text-sm">
                                {resendLoading ? "Resending..." : isTimerActive ? `Resend in ${timer}s` :
                                    !loading && "Didn't receive code? Resend"
                                }
                            </button>
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
                                    Verifying OTP...
                                </>
                                : "Verify OTP"
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
    );
}

export default OTP;
