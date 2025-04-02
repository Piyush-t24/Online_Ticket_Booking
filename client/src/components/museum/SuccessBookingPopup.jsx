import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { ContextConfirmOrder, ContextMuseum } from "../context/context";
import { useContext, useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from 'react-confetti';
import Shimmer from "./SuccessBookingShimmer";
import { toast, ToastContainer, Bounce } from "react-toastify";

const SuccessBookingPopup = ({ availableSlots, selectedSlot, orderDetails }) => {

    const { MuseumData } = useContext(ContextMuseum);
    const slotInfo = availableSlots.filter((slot) => slot._id === selectedSlot);
    const { confirmOrder, setConfirmOrder } = useContext(ContextConfirmOrder);
    const [isConfettiActive, setIsConfettiActive] = useState(false);

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

    useEffect(() => {
        if (confirmOrder) {
            toast.success('Payment Successful! Order Created!');
            setIsConfettiActive(true);
            setTimeout(() => {
                setIsConfettiActive(false);
            }, 5000);
        }
    }, [confirmOrder]);

    const { width, height } = useWindowSize();
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
            <div
                onClick={() => setConfirmOrder(false)}
                className="fixed inset-0 flex justify-center items-center bg-black/20 transition-colors z-50"
            >
                {isConfettiActive &&
                    <Confetti
                        width={width}
                        height={height}
                    />}
                <div
                    onClick={(e) => e.stopPropagation()}
                    // scrollbar-hidden css style is written in app.css
                    className="bg-white rounded-xl shadow p-4 mx-2 mt-[8vh] max-h-[85vh] overflow-y-scroll scrollbar-hidden transition-all scale-100 opacity-100 relative"
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setConfirmOrder(false)}
                        className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                    >
                        <MdCancel size={25} color="red" />
                    </button>

                    {/* Success Header */}
                    <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Booking Confirmed!</h2>

                        {/* Price Paid Section */}
                        <div className="flex items-center justify-center">
                            <span className="text-lg font-light text-gray-800 mr-2">Amount Paid:</span>
                            <span className="text-lg font-light text-green-600">₹{orderDetails && orderDetails.order.amount}</span>
                        </div>
                    </div>

                    {/* Order, Visitor, and Visit Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Order Details */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="font-semibold">Order Number:</div>
                            <div>{orderDetails && orderDetails.order.orderNum}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="font-semibold">Receipt ID:</div>
                            <div>{orderDetails && orderDetails.order.receiptId}</div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Visitor Information</h3>
                            <div className="grid grid-cols-2 gap-1">
                                <p title="indian adult">IAdult: {orderDetails?.order?.tickets?.indianAdult}</p>
                                <p title="indian child">IChild: {orderDetails?.order?.tickets?.indianChild}</p>
                                <p title="foreign adult">FAdult: {orderDetails?.order?.tickets?.foreignAdult}</p>
                                <p title="foreign child">FChild: {orderDetails?.order?.tickets?.foreignChild}</p>
                            </div>
                        </div>

                        {/* Visit Details */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Visit Details</h3>
                            <p>Date: {formatDate(slotInfo[0].date)}</p>
                            <p>Time: {formatTime(slotInfo[0].slots.startTime.hour, slotInfo[0].slots.startTime.minute)} - {formatTime(slotInfo[0].slots.endTime.hour, slotInfo[0].slots.endTime.minute)}</p>
                        </div>
                    </div>

                    {/* Venue Details */}
                    <div className="bg-gray-50 p-4 rounded-lg mt-4">
                        <h3 className="font-semibold mb-2">Venue Information</h3>
                        <p>{MuseumData.venue.name}</p>
                        <p>{MuseumData.venue.location.address}</p>
                        <p>{MuseumData.venue.location.city}, {MuseumData.venue.location.state} - {MuseumData.venue.location.pin}</p>
                        <p>Phone: {MuseumData.venue.phNo}</p>
                        <p>Email: {MuseumData.venue.email}</p>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-4 text-center text-sm text-gray-600">
                        <p>Looking forward to your visit!</p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SuccessBookingPopup;
