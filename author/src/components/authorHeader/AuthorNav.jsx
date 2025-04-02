import React from 'react'
import AuthorProfileDropdown from './AuthorProfileDropdown';

const AuthorNav = ({ authorData }) => {
    // console.log(authorData)
    return (
        <header id="header" className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">

                    <div className="flex-shrink-0 flex items-center flex-col">
                        <h1 className="text-2xl font-bold text-indigo-600">HeritageHub</h1>
                    </div>

                    {/* <!-- Right Side Icons --> */}
                    <div className="flex items-center space-x-4">
                        <AuthorProfileDropdown authorData={authorData} />
                        {/* {!authorData && !authorData.results ?


                            <div className='flex gap-4'>
                                <Link to='/register'>
                                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        Register
                                    </button>
                                </Link>
                                <Link to='/login'>
                                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        Login
                                    </button>
                                </Link>
                            </div>
                        } */}
                    </div>
                </div>


            </div>
        </header>

    )
}

export default AuthorNav
