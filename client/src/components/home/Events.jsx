import React from 'react'
import Search from './Search'

const Events = () => {
    return (
        <>

            <section className="relative pt-32 pb-24 bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in">
                            Book Your Next <span className="text-yellow-400">Adventure</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                            Discover and book tickets for the most exciting adventure
                        </p>

                        {/* <!-- Search Box --> */}
                        <div className="max-w-xl mx-auto rounded-xl shadow-xl mb-8">
                            <Search />
                        </div>

                        {/* <!-- Quick Stats --> */}
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-white">
                            <div className="p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm">
                                <i className="fas fa-city text-2xl mb-2 text-yellow-400"></i>
                                <h3 className="text-2xl font-bold mb-1">25+</h3>
                                <p className="text-sm">Cities</p>
                            </div>
                            <div className="p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm">
                                <i className="fas fa-map-marker-alt text-2xl mb-2 text-yellow-400"></i>
                                <h3 className="text-2xl font-bold mb-1">100+</h3>
                                <p className="text-sm">Locations</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Decorative Elements --> */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg className="w-full h-16 text-white" preserveAspectRatio="none" viewBox="0 0 1440 48">
                        <path fill="currentColor" d="M0 48h1440V0C1440 0 1080 48 720 48C360 48 0 0 0 0v48z"></path>
                    </svg>
                </div>
            </section>
        </>
    )
}

export default Events
