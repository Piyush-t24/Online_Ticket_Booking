import React, { useState, useEffect } from 'react'
import AuthorProfile from './components/AuthorProfile'
import ManageSlots from './components/ManageSlots'
import AuthorNav from './components/authorHeader/AuthorNav'
import Footer from './components/Footer'
import { useNavigate } from 'react-router-dom'
import { useGetAuthorDetailsQuery } from './authorApi'
import AuthorLoading from './components/AuthorLoading'

const Author = () => {
    const navigate = useNavigate();
    const [authorData, setAuthorData] = useState(null)

    const { data: authorDetails, error, isLoading } = useGetAuthorDetailsQuery();
    useEffect(() => {
        if (authorDetails) {
            setAuthorData(authorDetails);
        } else if (error) {
            navigate("/login");
        }
    }, [authorDetails, error, navigate]);


    return (
        <>
            {authorData && authorData.details ?
                <>
                    <AuthorNav authorData={authorData.details} />
                    <main className='mt-16 bg-indigo-200'>
                        <AuthorProfile authorData={authorData.details} />
                        <ManageSlots />
                        {/* Analytics.jsx is in ManageSlots.jsx */}
                    </main>
                    <hr className='border-gray-300 dark:border-gray-600' />
                    <Footer />
                </> :
                <AuthorLoading />
            }
        </>
    )
}

export default Author
