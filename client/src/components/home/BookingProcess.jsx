import React from 'react'

const BookingProcess = () => {
  return (
    <section id="booking-process" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Easy Booking Process</h2>
          <p className="text-lg text-gray-600">Book your tickets in just a few simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="relative">
            <div className="bg-indigo-50 rounded-xl p-6 text-center h-full">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="mb-4 mt-4">
                <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-search text-2xl text-indigo-600"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Search Event</h3>
              <p className="text-gray-600 text-sm">Browse through our extensive collection of events</p>
            </div>
            <div className="hidden md:block absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-1/2">
              <i className="fas fa-chevron-right text-2xl text-indigo-300"></i>
            </div>
          </div>

          <div className="relative">
            <div className="bg-indigo-50 rounded-xl p-6 text-center h-full">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="mb-4 mt-4">
                <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-ticket-alt text-2xl text-indigo-600"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select Tickets</h3>
              <p className="text-gray-600 text-sm">Choose your preferred seats and ticket quantity</p>
            </div>
            <div className="hidden md:block absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-1/2">
              <i className="fas fa-chevron-right text-2xl text-indigo-300"></i>
            </div>
          </div>

          <div className="relative">
            <div className="bg-indigo-50 rounded-xl p-6 text-center h-full">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="mb-4 mt-4">
                <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-credit-card text-2xl text-indigo-600"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">Pay securely with your preferred payment method</p>
            </div>
            <div className="hidden md:block absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-1/2">
              <i className="fas fa-chevron-right text-2xl text-indigo-300"></i>
            </div>
          </div>

          <div className="relative">
            <div className="bg-indigo-50 rounded-xl p-6 text-center h-full">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div className="mb-4 mt-4">
                <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-qrcode text-2xl text-indigo-600"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Tickets</h3>
              <p className="text-gray-600 text-sm">Receive your e-tickets instantly via email</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingProcess
