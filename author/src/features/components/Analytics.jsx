import React, { useEffect, useState } from 'react'
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { formatDate } from './ManageSlots';

const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Analytics = ({ slotData }) => {
    const [data, setData] = useState([]);
    const [chartType, setChartType] = useState('bar');

    const sum = slotData.slotList.reduce((acc, value) => acc + value.currentBookings, 0)

    const getBookingTrendsData = (slotData) => {
        return slotData.slotList.map((slot) => ({
            fullDate: new Date(slot.date).toDateString(),
            date: formatDate(slot.date),
            bookings: slot.currentBookings,
        }));
    };

    useEffect(() => {
        const transformed = getBookingTrendsData(slotData).slice(-7);
        setData(transformed);
    }, [slotData]);

    return (
        <section id="analytics" className="p-6 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Total Slots */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Slots</p>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{slotData.slotList.length}</h3>
                            </div>
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
                                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Total Bookings */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Bookings</p>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{sum}</h3>
                            </div>
                            <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Average Capacity */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Capacity</p>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">12</h3>
                            </div>
                            <div className="p-2 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Trends Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Booking Trends (Last 7 days)</h3>
                        <div className="flex gap-2">
                            {['bar', 'line', 'pie'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setChartType(type)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium border ${
                                        chartType === type
                                            ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
                                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                        {chartType === 'bar' && (
                            <BarChart data={data} barCategoryGap={10}>
                                <CartesianGrid stroke="#e5e7eb" vertical={false} />
                                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#d1d5db' }} tickLine={false} />
                                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#d1d5db' }} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                                    contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb', borderRadius: '8px' }}
                                    labelStyle={{ fontWeight: 600, color: '#4b5563' }}
                                    formatter={(value) => [`${value}`, 'Bookings']}
                                    labelFormatter={(label) => {
                                        const full = data.find(d => d.date === label)?.fullDate;
                                        return full || label;
                                    }}
                                />
                                <defs>
                                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0.3} />
                                    </linearGradient>
                                </defs>
                                <Bar dataKey="bookings" fill="url(#colorBookings)" radius={[6, 6, 0, 0]} barSize={30} />
                            </BarChart>
                        )}

                        {chartType === 'line' && (
                            <LineChart data={data}>
                                <defs>
                                    <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb', borderRadius: '8px' }}
                                    labelStyle={{ fontWeight: 600, color: '#4b5563' }}
                                    formatter={(value) => [`${value}`, 'Bookings']}
                                    labelFormatter={(label) => {
                                        const full = data.find(d => d.date === label)?.fullDate;
                                        return full || label;
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="bookings"
                                    stroke="#22c55e"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 5 }}
                                    fill="url(#lineFill)"
                                />
                            </LineChart>
                        )}

                        {chartType === 'pie' && (
                            <PieChart>
                                <Tooltip />
                                <Legend />
                                <Pie
                                    data={data}
                                    dataKey="bookings"
                                    nameKey="date"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    )
}

export default Analytics;
