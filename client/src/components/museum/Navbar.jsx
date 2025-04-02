import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import ProfileDropdown from '../home/header/ProfileDropdown'
import { ContextCheckLogin } from '../context/context'


const Header = () => {

    const [loading, setLoading] = useState(true);
    const { resData, setResData } = useContext(ContextCheckLogin)
    // console.log(resData)
    const getData = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_HOST}/user`,
                {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
            if (!res.ok) {
                throw new Error('user not logged in!')
            }
            const data = await res.json()
            setResData(data)
            // console.log(data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <header id="header" className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">

                    <div className="flex-shrink-0 flex items-center flex-col">
                        <h1 className="text-2xl font-bold text-indigo-600"><a href="/">HeritageHub</a></h1>
                    </div>

                    {/* <!-- Right Side Icons --> */}
                    <div className="flex items-center space-x-4">
                        {loading ?
                            (
                                <div className="rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse w-10 h-10" >
                                </div>
                            ) :
                            resData && resData.email ?
                                <ProfileDropdown resData={resData} /> :
                                (
                                    <div className='flex gap-4'>
                                        <Link to='/login'>
                                            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                                Sign In
                                            </button>
                                        </Link>
                                    </div>
                                )
                        }
                    </div>
                </div>


            </div>
        </header>

    )
}

export default Header
