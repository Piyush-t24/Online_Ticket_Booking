import React, { useState } from 'react';

const AuthorProfile = ({ authorData }) => {
    const [editField, setEditField] = useState(false);
    const [profile, setProfile] = useState({ name: authorData.user.name });

    const handleChange = (e) => {
        setProfile({ ...profile, name: e.target.value });
    };
    const handleSave = () => {
        console.log(profile);
        setEditField(false);
    };

    // console.log(authorData);
    return (
        <section id="profile" className="p-6">
            <div className="max-w-4xl mx-auto">
                {/* Author Details */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Author Details</h2>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col gap-2 justify-center items-center">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-400 flex justify-center items-center">
                                <span className="text-3xl">{authorData.user.name.charAt(0)}</span>
                            </div>
                            <div>author</div>
                        </div>

                        <div className="flex-grow">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                                    {editField ? (
                                        <div className="block">
                                            <input
                                                type="text"
                                                value={profile.name}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 w-2/5"
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-base text-gray-900">{authorData.user.name}</p>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                    <p className="text-base text-gray-900">{authorData.user.email}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Permissions</h3>
                                    <p className="text-base text-gray-900">{authorData.user.permissions}</p>
                                </div>
                                <div className="flex gap-6 flex-wrap items-center">
                                    {!editField ? (
                                        <button
                                            className="flex-1 min-w-fit max-w-[5vw] bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300"
                                            onClick={() => setEditField(true)}
                                        >
                                            Edit
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => setEditField(false)}
                                                className="flex-1 min-w-fit max-w-[5vw] bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className="flex-1 min-w-fit max-w-[5vw] bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300"
                                            >
                                                Save
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Venue Details */}
                <div
                    className="relative bg-white rounded-lg border border-gray-200 p-6"
                    style={{
                        backgroundImage: `url(${authorData.imgLink})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Overlay for better readability */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                    <div className="relative z-10">
                        <h2 className="text-lg font-semibold text-white mb-4">Venue Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                            <div>
                                <h3 className="text-sm font-medium">Venue Name</h3>
                                <p className="text-base">{authorData.venueName}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium">Address</h3>
                                <p className="text-base">{authorData.location.address}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium">City</h3>
                                <p className="text-base">{authorData.location.city}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium">State</h3>
                                <p className="text-base">{authorData.location.state}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium">PIN Code</h3>
                                <p className="text-base">{authorData.location.pin}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AuthorProfile;
