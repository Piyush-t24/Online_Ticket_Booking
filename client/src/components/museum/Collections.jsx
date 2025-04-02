import React from 'react'

const Collections = () => {
    return (
        <section id="Collections" className="py-20 bg-neutral-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 ">
                    <h2 className="text-3xl font-bold mb-4">Our Collections</h2>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-neutral-800 rounded-lg p-6 transition-transform duration-300 hover:transform hover:scale-105 Up">
                        <div className="h-48 bg-neutral-700 rounded-lg mb-4 flex items-center justify-center">
                            <svg className="w-20 h-20 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Maurya Period</h3>
                        <p className="text-neutral-300">Discover ancient artifacts and sculptures from the Maurya Empire period, showcasing the rich Buddhist heritage.</p>
                    </div>

                    <div className="bg-neutral-800 rounded-lg p-6 transition-transform duration-300 hover:transform hover:scale-105 Up">
                        <div className="h-48 bg-neutral-700 rounded-lg mb-4 flex items-center justify-center">
                            <svg className="w-20 h-20 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Kushana Period</h3>
                        <p className="text-neutral-300">Explore the artistic excellence of the Kushana dynasty through our carefully curated collection.</p>
                    </div>

                    <div className="bg-neutral-800 rounded-lg p-6 transition-transform duration-300 hover:transform hover:scale-105 Up">
                        <div className="h-48 bg-neutral-700 rounded-lg mb-4 flex items-center justify-center">
                            <svg className="w-20 h-20 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Gupta Period</h3>
                        <p className="text-neutral-300">View magnificent sculptures and inscriptions from the Golden Age of Indian art and culture.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Collections
