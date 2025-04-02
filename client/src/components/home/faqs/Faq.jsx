import React, { useState } from 'react'
import General from './General';
import Booking from './Booking';
import Payment from './Payment';

const Faq = () => {
  const [activeComponent, setActiveComponent] = useState('general'); // Default to 'MyProfile'

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Find answers to common questions about our ticket booking service</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button onClick={() => setActiveComponent('general')} className={`px-6 py-2 text-white  ${activeComponent === 'general' ? "bg-indigo-600" : "bg-gray-500"} rounded-full text-sm font-semibold hover:bg-indigo-600`}>
              General
            </button>
            <button onClick={() => setActiveComponent('booking')} className={`px-6 py-2 text-white  ${activeComponent === 'booking' ? "bg-indigo-600" : "bg-gray-500"} rounded-full text-sm font-semibold hover:bg-indigo-600`}>
              Booking
            </button>
            <button onClick={() => setActiveComponent('payment')} className={`px-6 py-2 text-white  ${activeComponent === 'payment' ? "bg-indigo-600" : "bg-gray-500"} rounded-full text-sm font-semibold hover:bg-indigo-600`}>
              Payment
            </button>
          </div>

          <div className="space-y-4">

            {
              (() => {
                switch (activeComponent) {
                  case 'general':
                    return <General />;
                  case 'booking':
                    return <Booking />;
                  case 'payment':
                    return <Payment />;
                  default:
                    return <General />;
                }
              })()
            }

          </div>

          {/* <div className="mt-12 text-center bg-white rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6">Our Chat Bot is here to assist you 24/7</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
                <i className="fas fa-comment-alt mr-2"></i>
                Chat Bot
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default Faq
