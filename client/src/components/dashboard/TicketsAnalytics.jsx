import React from 'react'

const TicketsAnalytics = ({ activeTickets, totalTickets, expiredTickets }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-indigo-50 rounded-xl p-6">
                <h4 className="text-indigo-600 font-semibold mb-2">Total Tickets</h4>
                <p className="text-3xl font-bold">{totalTickets}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6">
                <h4 className="text-green-600 font-semibold mb-2">Active Tickets</h4>
                <p className="text-3xl font-bold">{activeTickets}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6">
                <h4 className="text-purple-600 font-semibold mb-2">Expired Tickets</h4>
                <p className="text-3xl font-bold">{expiredTickets}</p>
            </div>
        </div>
    )
}

export default TicketsAnalytics
