import React, { useContext } from 'react'
import { ContextMuseum } from '../context/context'
import { Link as ElementLink } from 'react-scroll'

const VisitingInfo = () => {
    const { MuseumData, setMuseumData } = useContext(ContextMuseum)
    const week = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]

    function formatTime(hour, minute) {
        const amPm = hour < 12 ? 'AM' : 'PM';

        let hour12 = hour % 12;
        if (hour12 === 0) hour12 = 12;
        const formattedTime = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amPm}`;
        return formattedTime;
    }

    return (
        <section id="About" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 ">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-4">Visiting Information</h2>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
                </div>

                <div className="space-y-6 Right">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        <div className="bg-neutral-50 p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Location</h3>
                            <p className="flex flex-col text-neutral-600">
                                <span>{MuseumData.venue.location.address}</span>
                                <span>{MuseumData.venue.location.city + ", " + MuseumData.venue.location.state}</span>
                                <span>PIN: {MuseumData.venue.location.pin}</span>
                            </p>
                        </div>

                        <div className="bg-neutral-50 p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Contact</h3>
                            <div className="text-neutral-600">
                                <p>Phone: <a href="tel:5422595095" className="hover:text-indigo-600">{MuseumData.venue.phNo}</a></p>
                                <p>Email: <a href="mailto:info@sarnathmuseum.com" className="hover:text-indigo-600">{MuseumData.venue.email}</a></p>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-neutral-50 rounded-lg p-8 shadow-lg Left">
                            <h3 className="text-2xl font-bold text-neutral-900 mb-6">Ticket Prices</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
                                    <span className="text-neutral-700 font-medium">Indian Adults</span>
                                    <span className="text-lg font-bold text-indigo-600">₹{MuseumData.venue.fare.indianAdult}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
                                    <span className="text-neutral-700 font-medium">Indian Children</span>
                                    <span className="text-lg font-bold text-indigo-600">₹{MuseumData.venue.fare.indianChild}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
                                    <span className="text-neutral-700 font-medium">Foreign Adults</span>
                                    <span className="text-lg font-bold text-indigo-600">₹{MuseumData.venue.fare.foreignAdult}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-700 font-medium">Foreign Children</span>
                                    <span className="text-lg font-bold text-indigo-600">₹{MuseumData.venue.fare.foreignChild}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-50 rounded-lg p-8 shadow-lg Right">
                            <h3 className="text-2xl font-bold text-neutral-900 mb-6">Opening Hours</h3>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-indigo-600 rounded-full">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-neutral-900 font-medium">Working Hours</p>
                                        <p className="text-neutral-600">{formatTime(MuseumData.venue.workingHours.opening.hour, MuseumData.venue.workingHours.opening.minute)} - {formatTime(MuseumData.venue.workingHours.closing.hour, MuseumData.venue.workingHours.closing.minute)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-indigo-600 rounded-full">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-neutral-900 font-medium">Working Days</p>
                                        <div className="text-neutral-600 flex gap-2 flex-wrap mt-1">
                                            {week.map((week, index) => {
                                                return (

                                                    <div key={index} className={`flex items-center justify-center w-7 h-7 
                                                    ${MuseumData.venue.workingsDays.includes(week) ? "bg-amber-500" : "bg-gray-500"} text-white text-sm font-bold rounded-full`}>
                                                        {week.slice(0, 2)}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <ElementLink to="booking" smooth={true} duration={500} className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 cursor-pointer">
                                    Book Your Visit
                                </ElementLink>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section >
    )
}

export default VisitingInfo
