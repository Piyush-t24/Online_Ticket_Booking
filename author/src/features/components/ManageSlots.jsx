import React, { useState, useEffect } from 'react';
import AddSlots from './AddSlots';
import { BiEdit } from 'react-icons/bi';
import { TbListDetails } from 'react-icons/tb'
import Analytics from './Analytics';
import { useGetAllSlotsQuery } from '../authorApi';
import { ToastContainer, toast, Bounce } from 'react-toastify';


export const formatDate = (date) => {
    // date received is like: 2025-02-01T00:00:00.000Z
    return new Date(date.split("T")[0]).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
    // return new Date(date.split("T")[0]).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }).replace(" ", ", ")
}

export const formatTime = (hour, minute) => {
    const amPm = hour < 12 ? 'AM' : 'PM';
    let hour12 = hour % 12;
    if (hour12 === 0) hour12 = 12;
    return `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amPm}`;
};

const ManageSlots = () => {

    const [isEditing, setIsEditing] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const { data: slotData, isError, isLoading, error } = useGetAllSlotsQuery();
    console.log("slotData", slotData);
    const tableHeading = [
        "Actions", "Date", "Start Time", "End Time", "Max Capacity", "Elastic Capacity", "Current Bookings"
    ]

    const handleSubmit = () => {
        console.log({ maxCapacity: selectedSlot.maxCapacity, elasticCapacity: selectedSlot.elasticCapacity })
        setIsEditing(null);
        setSelectedSlot(null);
    };

    const handleEditClick = (slot) => {
        setSelectedSlot(slot);
        setIsEditing(slot._id);
    };

    const handleDetailsClick = (slot) => {
        setSelectedSlot(slot);
    };

    const handleCloseModal = () => {
        setSelectedSlot(null);
        setIsEditing(null);
    };

    useEffect(() => {
        if (isError) {
            toast.error(error.data?.message || error.data?.error || "Error fetching slots");
        }
    }, [isError]);

    // TODO: add pagination and sorting by date and capacity
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            {slotData ?
                <section id="slots" className="p-6 dark:bg-gray-900">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-lg border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                            {/* AddSlots Component */}
                            <AddSlots />


                            {slotData.slotList.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No slots available</h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Start by creating a new slot.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <div className="max-h-96 overflow-y-auto">
                                        <table className="min-w-full divide-y divide-gray-200 text-center dark:divide-gray-700">
                                            <thead className="bg-gray-50 sticky top-0 z-10 dark:bg-gray-700">
                                                <tr>
                                                    {tableHeading.map((data, index) => (
                                                        <th key={index} className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                                                            {data}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                                {slotData?.slotList.slice().reverse().map((slot) => (
                                                    <tr key={slot._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                        <td className="px-6 py-4">
                                                            <div className="flex space-x-2 justify-center">
                                                                <TbListDetails title='Details' className='cursor-pointer dark:text-gray-300' onClick={() => handleDetailsClick(slot)} />
                                                                <BiEdit title='Edit' className='cursor-pointer dark:text-gray-300' onClick={() => handleEditClick(slot)} />
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 dark:text-gray-200">{formatDate(slot.date)}</td>
                                                        <td className="px-6 py-4 dark:text-gray-200">
                                                            {formatTime(slot.slots.startTime.hour, slot.slots.startTime.minute)}
                                                        </td>
                                                        <td className="px-6 py-4 dark:text-gray-200">
                                                            {formatTime(slot.slots.endTime.hour, slot.slots.endTime.minute)}
                                                        </td>
                                                        <td className="px-6 py-4 dark:text-gray-200">{slot.maxCapacity}</td>
                                                        <td className="px-6 py-4 dark:text-gray-200">{slot.elasticCapacity}</td>
                                                        <td className="px-6 py-4 dark:text-gray-200">{slot.currentBookings}</td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            )}
                        </div>

                        {selectedSlot && (
                            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 dark:bg-opacity-70">
                                <div className="bg-white rounded-lg p-6 max-w-lg w-fit dark:bg-gray-800">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 dark:text-gray-100">
                                        {isEditing ? 'Edit Slot' : 'Slot Details'}
                                    </h3>
                                    {isEditing ? (
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSubmit();
                                        }}>
                                            <div className="mb-4">
                                                <label className="block font-medium text-gray-700 dark:text-gray-200">Max Capacity:</label>
                                                <input
                                                    type="number"
                                                    value={selectedSlot.maxCapacity}
                                                    onChange={(e) => setSelectedSlot({ ...selectedSlot, maxCapacity: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                                    min="1"
                                                    required
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block font-medium text-gray-700 dark:text-gray-200">Elastic Capacity:</label>
                                                <input
                                                    type="number"
                                                    value={selectedSlot.elasticCapacity}
                                                    onChange={(e) => setSelectedSlot({ ...selectedSlot, elasticCapacity: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                                    min="1"
                                                    required
                                                />
                                            </div>

                                            <div className='flex space-x-4'>
                                                <button
                                                    type="button"
                                                    onClick={handleCloseModal}
                                                    className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                                                >
                                                    Save
                                                </button>
                                            </div></form>
                                    ) : (
                                        <div>

                                            <p className="dark:text-gray-100"><strong>Date:</strong> {new Date(selectedSlot.date).toDateString()}</p>
                                            <p className="dark:text-gray-100"><strong>Start Time:</strong> {formatTime(selectedSlot.slots.startTime.hour, selectedSlot.slots.startTime.minute)}</p>
                                            <p className="dark:text-gray-100"><strong>End Time:</strong> {formatTime(selectedSlot.slots.endTime.hour, selectedSlot.slots.endTime.minute)}</p>
                                            <p className="dark:text-gray-100"><strong>Max Capacity:</strong> {selectedSlot.maxCapacity}</p>
                                            <p className="dark:text-gray-100"><strong>Elastic Capacity:</strong> {selectedSlot.elasticCapacity}</p>
                                            <p className="dark:text-gray-100"><strong>Current Bookings:</strong> {selectedSlot.currentBookings}</p>
                                            <div className="flex space-x-4 mt-4">
                                                <button
                                                    onClick={handleCloseModal}
                                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <Analytics slotData={slotData} />
                </section>
                :
                // shimmer effect exaclty the above 
                <div className='p-6 dark:bg-gray-900'>
                    <div className="p-6 mb max-w-6xl mx-auto rounded-lg bg-white dark:bg-gray-800">
                        <div className="animate-pulse">
                            <div className="h-8 w-1/4 bg-gray-300 rounded-md mb-4"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="h-6 w-full bg-gray-300 rounded-md mb-2"></div>
                                        <div className="h-4 w-full bg-gray-300 rounded-md mb-2"></div>
                                        <div className="h-4 w-full bg-gray-300 rounded-md mb-2"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ManageSlots;
