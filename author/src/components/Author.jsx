import React, { useState, useEffect } from 'react'
import AuthorProfile from './AuthorProfile'
import ManageSlots from './ManageSlots'
import AuthorNav from './authorHeader/AuthorNav'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

const Author = () => {
    const navigate = useNavigate();
    const [authorData, setAuthorData] = useState(null)
    const getAuthorData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_HOST}/author/dashboard`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                const err = await response.json();
                if (/Invalid|No token|Unauthorised/.test(err.message || err.error)) {
                    navigate("/login");
                    return;
                }
                throw err;
            }
            const data = await response.json();
            setAuthorData(data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getAuthorData();
    }, [])

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
                    <Footer />
                </> : "Loading..."
            }
        </>
    )
}

export default Author
