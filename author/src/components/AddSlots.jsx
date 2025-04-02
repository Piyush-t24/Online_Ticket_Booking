import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const AddSlots = ({ rerenderManageSlots }) => {
    const { rerender, setRerender } = rerenderManageSlots;

    // const convertTimeTwoDigit
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
        // console.log(name, value)

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

    const handleAddData = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_HOST}/author/add-slot`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(addSlotData),
            });

            if (!res.ok) {
                throw new Error('Error while adding Slot!');
            }
            handleCloseModal();
            setRerender(!rerender)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Manage Slots</h2>
                <button onClick={handleOpenModal} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-150">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Slot
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-lg w-full">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Slot Details</h3>

                        {/* Form */}
                        <form className="space-y-4" onSubmit={handleAddData}>
                            <div>
                                <label htmlFor="date" className="block text-gray-700">Date</label>
                                <input
                                    type="date"
                                    min={new Date().toISOString().split("T")[0]}
                                    max={new Date(new Date().setDate(new Date().getDate() + 7)
                                    ).toISOString().split("T")[0]}
                                    id="date"
                                    name="date"
                                    value={addSlotData.date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <div className="w-full">
                                    <label htmlFor="startTime" className="block text-gray-700">Start Time</label>
                                    <input
                                        type="time"
                                        id="startTime"
                                        name="startTime"
                                        value={`${addSlotData.slots.startTime.hour}:${addSlotData.slots.startTime.minute}`}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <div className="w-full">
                                    <label htmlFor="endTime" className="block text-gray-700">End Time</label>
                                    <input
                                        type="time"
                                        id="endTime"
                                        name="endTime"
                                        value={`${addSlotData.slots.endTime.hour}:${addSlotData.slots.endTime.minute}`}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="maxCapacity" className="block text-gray-700">Max Capacity</label>
                                <input
                                    type="number"
                                    id="maxCapacity"
                                    name="maxCapacity"
                                    value={addSlotData.maxCapacity}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label htmlFor="elasticCapacity" className="block text-gray-700">Elastic Capacity</label>
                                <input
                                    type="number"
                                    id="elasticCapacity"
                                    name="elasticCapacity"
                                    value={addSlotData.elasticCapacity}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="flex space-x-4 mt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Save Slot
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