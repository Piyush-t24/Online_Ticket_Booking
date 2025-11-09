import React, { useState, useEffect } from 'react'
import TicketsAnalytics from './TicketsAnalytics';
import { useGetTicketOrderDetailsQuery } from '../dashboardApi';

const PurchaseHistory = () => {

    const [totalTickets, setTotalTickets] = useState(0);
    const [purchaseHistory, setPurchaseHistory] = useState([]);


    const formatDate = (date) => {
        // date received is like: 2025-02-01T00:00:00.000Z
        return new Date(date.split("T")[0]).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    }

    const formatTime = (hour, minute) => {
        const amPm = hour < 12 ? 'AM' : 'PM';
        let hour12 = hour % 12;
        if (hour12 === 0) hour12 = 12;
        return `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amPm}`;
    };

    const { data: ticketOrderDetails, error: error, isLoading: loading, isSuccess } = useGetTicketOrderDetailsQuery();

    useEffect(() => {
        if (ticketOrderDetails && isSuccess) {
            setTotalTickets(ticketOrderDetails.orders.length);
            setPurchaseHistory(ticketOrderDetails.orders.filter((items) => {
                const currentTime = new Date();
                const eventDate = new Date(items.slotId.date);
                const eventHour = items.slotId.slots.endTime.hour;
                const eventMinute = items.slotId.slots.endTime.minute;

                const eventEndTime = new Date(eventDate);
                eventEndTime.setHours(eventHour, eventMinute, 0, 0);

                return eventEndTime < currentTime;
            }));

        }
    }, [ticketOrderDetails, isSuccess]);

    return (
        <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold mb-6">Purchase History</h2>

            {loading && error === '' ?
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {
                        Array(2).fill().map((_, index) => (
                            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition duration-300 animate-pulse">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="h-5 w-36 bg-gray-300 rounded-md"></div>
                                            <div className="h-4 w-24 bg-gray-300 rounded-md mt-2"></div>
                                        </div>
                                        <div className="h-6 w-16 bg-red-200 rounded-full"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                                            <div className="h-4 w-32 bg-gray-300 rounded-md ml-2"></div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                                            <div className="h-4 w-40 bg-gray-300 rounded-md ml-2"></div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                                            <div className="h-4 w-28 bg-gray-300 rounded-md ml-2"></div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex space-x-3">
                                        <div className="h-10 w-full bg-gray-300 rounded-lg"></div>
                                        <div className="h-10 w-full bg-gray-300 rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                :
                (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {purchaseHistory.reverse().slice(0, 2).map((items) => {
                            return (
                                <div key={items._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-lg mb-1">{items.venueId.name}</h3>
                                                <p className="text-gray-600">{items.orderNum}</p>
                                            </div>
                                            <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">Expired</span>
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <i className="fas fa-calendar-alt w-5"></i>
                                                <span>{formatDate(items.slotId.date)}, {formatTime(items.slotId.slots.startTime.hour, items.slotId.slots.startTime.minute)} - {formatTime(items.slotId.slots.endTime.hour, items.slotId.slots.endTime.minute)}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-map-marker-alt w-5"></i>
                                                <span>{items.venueId.location.address}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-ticket-alt w-5"></i>
                                                <span>Receipt Id: {items.receiptId}</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex space-x-3">
                                            <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                                                View Ticket
                                            </button>
                                            <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition duration-300">
                                                Download PDF
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            }
            <TicketsAnalytics expiredTickets={purchaseHistory.length} totalTickets={totalTickets} activeTickets={totalTickets - purchaseHistory.length} />
        </div>
    )
}

export default PurchaseHistory
