import React from 'react'
import AuthorProfileDropdown from './AuthorProfileDropdown';
import Theme from '../Theme';

const AuthorNav = ({ authorData }) => {
    // console.log(authorData)
    return (
        <header id="header" className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">

                    <a className="flex-shrink-0 flex items-center gap-3">
                        <Theme />
                        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">MuseoPass</h1>
                    </a>

                    {/* <!-- Right Side Icons --> */}
                    <div className="flex items-center space-x-4">
                        <AuthorProfileDropdown authorData={authorData} />
                    </div>
                </div>


            </div>
        </header>

    )
}

export default AuthorNav
