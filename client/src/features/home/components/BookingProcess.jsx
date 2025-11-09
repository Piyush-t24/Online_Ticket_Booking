import React from 'react'

const steps = [
  {
    step: 1,
    title: "Search Event",
    description: "Browse through our extensive collection of events",
    iconClass: "fas fa-search",
    bgColor: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    stepCircleBg: "bg-indigo-600",
    stepArrow: true,
  },
  {
    step: 2,
    title: "Select Tickets",
    description: "Choose your preferred seats and ticket quantity",
    iconClass: "fas fa-ticket-alt",
    bgColor: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    stepCircleBg: "bg-indigo-600",
    stepArrow: true,
  },
  {
    step: 3,
    title: "Secure Payment",
    description: "Pay securely with your preferred payment method",
    iconClass: "fas fa-credit-card",
    bgColor: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    stepCircleBg: "bg-indigo-600",
    stepArrow: true,
  },
  {
    step: 4,
    title: "Get Tickets",
    description: "Receive your e-tickets instantly via email",
    iconClass: "fas fa-qrcode",
    bgColor: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    stepCircleBg: "bg-indigo-600",
    stepArrow: false, // Last one doesn't need arrow
  },
];



const BookingProcess = () => {
  return (
    <section id="booking-process" className="py-16 bg-white dark:bg-gray-900" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white">Easy Booking Process</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Book your tickets in just a few simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              <div className={`${item.bgColor} rounded-xl p-6 text-center h-full dark:bg-gray-800`}>
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 ${item.stepCircleBg} text-white rounded-full flex items-center justify-center font-bold`}>
                  {item.step}
                </div>
                <div className="mb-4 mt-4">
                  <div className={`w-16 h-16 mx-auto ${item.iconBg} rounded-full flex items-center justify-center`}>
                    <i className={`${item.iconClass} text-2xl ${item.iconColor}`}></i>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 text-sm dark:text-gray-300">{item.description}</p>
              </div>
              {item.stepArrow && (
                <div className="hidden md:block absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-1/2">
                  <i className="fas fa-chevron-right text-2xl text-indigo-300"></i>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BookingProcess
