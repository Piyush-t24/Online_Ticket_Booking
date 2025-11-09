import React from 'react'

const Categories = () => {
    return (
        <section id="categories" className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white">Browse by Category</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">Find adventures that match your interests</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    <div className="group bg-indigo-50 dark:bg-indigo-900 rounded-xl p-6 text-center hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-all duration-300 cursor-pointer">
                        <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-700 mb-4">
                            <i className="fas fa-archway text-2xl text-indigo-600 dark:text-indigo-300"></i>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Museums</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">100+ Events</p>
                    </div>

                    <div className="group bg-purple-50 dark:bg-purple-900 rounded-xl p-6 text-center hover:bg-purple-100 dark:hover:bg-purple-800 transition-all duration-300 cursor-pointer">
                        <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-700 mb-4">
                            <i className="fas fa-monument text-2xl text-purple-600 dark:text-purple-300"></i>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Monuments</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">50+ Events</p>
                    </div>

                    <div className="group bg-green-50 dark:bg-green-900 rounded-xl p-6 text-center hover:bg-green-100 dark:hover:bg-green-800 transition-all duration-300 cursor-pointer">
                        <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-700 mb-4">
                            <i className="fas fa-city text-2xl text-green-600 dark:text-green-300"></i>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Urban Attractions</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">100+ Events</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Categories
