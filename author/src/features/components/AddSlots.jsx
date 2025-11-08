import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useAddSlotMutation } from '../authorApi';

const AddSlots = () => {

    const [addSlotData, setAddSlotData] = useState({
        date: new Date().toISOString().split("T")[0],
        slots: {
            startTime: {
                hour: "09",
                minute: "00",
            },
            endTime: {
                hour: "12",
                minute: "00",
            },
        },
        maxCapacity: 1,
        elasticCapacity: 1,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'startTime' || name === 'endTime') {
            const [hour, minute] = value.split(':');
            setAddSlotData({
                ...addSlotData,
                slots: {
                    ...addSlotData.slots,
                    [name]: {
                        ...addSlotData.slots[name],
                        hour: hour,
                        minute: minute,
                    },
                },
            });

        } else {
            setAddSlotData({
                ...addSlotData,
                [name]: value,
            });
        }
    };

    const [addSlot, { isLoading: isAddingSlot }] = useAddSlotMutation();

    const handleAddData = async (e) => {
        e.preventDefault();
        addSlot(addSlotData).unwrap().then(() => {
            toast.success("Slot added successfully!");
            handleCloseModal();
        })
    };

    return (
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Manage Slots</h2>
                    <button onClick={handleOpenModal} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-150">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Slot
                    </button>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-gray-950 dark:bg-opacity-70 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-lg w-full dark:bg-gray-800">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 dark:text-gray-100">Add Slot Details</h3>

                            {/* Form */}
                            <form className="space-y-4" onSubmit={handleAddData}>
                                <div>
                                    <label htmlFor="date" className="block text-gray-700 dark:text-gray-200">Date</label>
                                    <input
                                        type="date"
                                        min={new Date().toISOString().split("T")[0]}
                                        max={new Date(new Date().setDate(new Date().getDate() + 7)
                                        ).toISOString().split("T")[0]}
                                        id="date"
                                        name="date"
                                        value={addSlotData.date}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                    />
                                </div>

                                <div className="flex space-x-4">
                                    <div className="w-full">
                                        <label htmlFor="startTime" className="block text-gray-700 dark:text-gray-200">Start Time</label>
                                        <input
                                            type="time"
                                            id="startTime"
                                            name="startTime"
                                            value={`${addSlotData.slots.startTime.hour}:${addSlotData.slots.startTime.minute}`}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                        />
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <div className="w-full">
                                        <label htmlFor="endTime" className="block text-gray-700 dark:text-gray-200">End Time</label>
                                        <input
                                            type="time"
                                            id="endTime"
                                            name="endTime"
                                            value={`${addSlotData.slots.endTime.hour}:${addSlotData.slots.endTime.minute}`}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="maxCapacity" className="block text-gray-700 dark:text-gray-200">Max Capacity</label>
                                    <input
                                        type="number"
                                        id="maxCapacity"
                                        name="maxCapacity"
                                        value={addSlotData.maxCapacity}
                                        onChange={handleChange}
                                        min="1"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="elasticCapacity" className="block text-gray-700 dark:text-gray-200">Elastic Capacity</label>
                                    <input
                                        type="number"
                                        id="elasticCapacity"
                                        name="elasticCapacity"
                                        value={addSlotData.elasticCapacity}
                                        onChange={handleChange}
                                        min="1"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                    />
                                </div>

                                <div className="flex space-x-4 mt-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isAddingSlot}
                                        className={`w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 ${isAddingSlot ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                    >
                                        {isAddingSlot ? "Adding..." : "Add Slot"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
    );
};

export default AddSlots;