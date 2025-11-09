import React from 'react'

const periods = [
    {
        title: 'Maurya Period',
        description: 'Discover ancient artifacts and sculptures from the Maurya Empire period, showcasing the rich Buddhist heritage.',
        iconPath: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
    },
    {
        title: 'Kushana Period',
        description: 'Explore the artistic excellence of the Kushana dynasty through our carefully curated collection.',
        iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    },
    {
        title: 'Gupta Period',
        description: 'View magnificent sculptures and inscriptions from the Golden Age of Indian art and culture.',
        iconPath: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
    }
];


const Collections = () => {
    return (
        <section id="Collections" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 ">
                    <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Collections</h2>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {periods.map((period, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 border rounded-lg p-6 transition-transform duration-300 hover:transform hover:scale-105 Up">
                            <div className="h-48 bg-gray-50 dark:bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
                                <svg className="w-20 h-20 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={period.iconPath}></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 dark:text-white">{period.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{period.description}</p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}

export default Collections
