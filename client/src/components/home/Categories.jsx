import React from 'react'

const Categories = () => {
    return (
        <section id="categories" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
                    <p className="text-lg text-gray-600">Find adventures that match your interests</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    <div className="group bg-indigo-50 rounded-xl p-6 text-center hover:bg-indigo-100 transition-all duration-300 cursor-pointer">
                        <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 mb-4">
                            <i className="fas fa-archway text-2xl text-indigo-600"></i>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Museums</h3>
                        <p className="text-sm text-gray-600">100+ Events</p>
                    </div>

                    <div className="group bg-purple-50 rounded-xl p-6 text-center hover:bg-purple-100 transition-all duration-300 cursor-pointer">
                        <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 mb-4">
                            <i className="fas fa-monument text-2xl text-purple-600"></i>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Monuments</h3>
                        <p className="text-sm text-gray-600">50+ Events</p>
                    </div>
                    <div className="group bg-green-50 rounded-xl p-6 text-center hover:bg-green-100 transition-all duration-300 cursor-pointer">
                        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 mb-4">
                            <i className="fas fa-city text-2xl text-green-600"></i>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Urban Attractions</h3>
                        <p className="text-sm text-gray-600">100+ Events</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Categories
