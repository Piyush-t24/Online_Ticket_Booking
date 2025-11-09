import React from 'react'

const events = [
  {
    tag: "HERITAGE",
    tagColor: "bg-blue-400",
    date: "10 Mar 2024",
    title: "Taj Mahal Heritage Walk",
    location: "Agra, India",
    price: "₹500",
  },
  {
    tag: "CULTURE",
    tagColor: "bg-green-400",
    date: "22 Apr 2024",
    title: "Indian Museum Exploration",
    location: "Kolkata, India",
    price: "₹300",
  },
  {
    tag: "ADVENTURE",
    tagColor: "bg-yellow-400",
    date: "5 May 2024",
    title: "Rajasthan Desert Safari",
    location: "Jaisalmer, India",
    price: "₹250",
  },
];


const FeaturedEvents = () => {
  return (
    <section id="featured-events" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Adventures</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Explore historical wonders and thrilling adventures in India</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
            >
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 bg-gray-300"></div>
                <div className={`absolute top-4 right-4 ${event.tagColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {event.tag}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <i className="fas fa-calendar-alt text-indigo-600 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                <div className="flex items-center mb-4">
                  <i className="fas fa-map-marker-alt text-indigo-600 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">{event.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-indigo-600">{event.price}</span>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <button className="bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-3 rounded-lg transition duration-300 inline-flex items-center">
            View All Events
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div> */}
      </div>
    </section>
  )
}

export default FeaturedEvents