import React from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Find = () => {
  const handleSearchEvents = (e) => {
    // can either use e.preventDefault or make type="button"
    e.preventDefault();
    toast.info('Search button working!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

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

      <section id="search" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Adventure</h2>
              <p className="text-lg text-gray-600">Search through hundreds of attractions</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <form className="space-y-6">
                <div className="relative">
                  <input type="text" placeholder="Search for adventures, attractions, and more..."
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
                  <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent">
                      <option value="">All Categories</option>
                      <option value="music">Museums</option>
                      <option value="sports">Monuments</option>
                      <option value="theater">Urban Attractions</option>
                    </select>
                    <i className="fas fa-chevron-down absolute right-4 top-[60%] text-gray-400"></i>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input type="text" placeholder="Enter city or venue"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
                    <i className="fas fa-map-marker-alt absolute left-4 top-[60%] text-gray-400"></i>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
                    <i className="fas fa-calendar absolute left-4 top-[60%] text-gray-400"></i>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                    <div className="flex items-center space-x-4">
                      <input type="number" placeholder="Min"
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
                      <span className="text-gray-500">to</span>
                      <input type="number" placeholder="Max"
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button onClick={handleSearchEvents} type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg transition duration-300 inline-flex items-center">
                    <i className="fas fa-search mr-2"></i>
                    Search Events
                  </button>
                </div>
              </form>

              {/* <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 mb-2">Popular Searches:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition duration-300">Concerts</button>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition duration-300">Sports Games</button>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition duration-300">Theater Shows</button>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition duration-300">Festivals</button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Find
