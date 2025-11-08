import React, { useState, useRef, useEffect } from 'react';
import AuthorPopup from './AuthorPopup';

const AuthorProfileDropdown = ({ authorData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown relative text-left" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleDropdown}
            >
                <img src="https://avatar.iran.liara.run/public" alt="User Avatar" className="rounded-full border bg-gray-600 object-cover w-10 h-10" />
            </button>
            {isOpen && (
                <div id="dropdownInformation" className=" z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute right-0 dark:divide-gray-600">
                    <div className="px-4 py-3 text-sm text-gray-900 break-words dark:text-white">
                        <div className="font-medium truncate text-wrap">{authorData.user.email}</div>
                    </div>
                    <div className="py-2">
                        <AuthorPopup />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthorProfileDropdown;
