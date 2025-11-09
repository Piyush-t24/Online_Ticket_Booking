import React from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Contacts = () => {

  const handleSendMessage = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
  }

  return (
      <section id="contact" className="py-16 bg-whiten dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">We're here to help! Reach out to us through any of these channels.</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-xl text-indigo-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 dark:text-white">Our Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">Uttar Pradesh<br />Uttar Pradesh, India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone-alt text-xl text-indigo-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 dark:text-white">Phone Support</h3>
                    <p className="text-gray-600 dark:text-gray-300">+91 123456789<br />Mon - Fri <br /> 9am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-xl text-indigo-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 dark:text-white">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-300">support@museopass.com<br />business@museopass.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4 dark:text-white">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition duration-300">
                    <i className="fab fa-facebook-f text-indigo-600"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition duration-300">
                    <i className="fab fa-twitter text-indigo-600"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition duration-300">
                    <i className="fab fa-instagram text-indigo-600"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition duration-300">
                    <i className="fab fa-linkedin-in text-indigo-600"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h3>
              <form onSubmit={handleSendMessage} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">First Name</label>
                    <input type="text" required className="w-full px-4 py-3 border dark:bg-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Last Name</label>
                    <input type="text" required className="w-full px-4 py-3 border dark:bg-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Email Address</label>
                  <input type="email" required className="w-full px-4 py-3 border dark:bg-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Subject</label>
                  <select required className="w-full px-4 py-3 border dark:bg-gray-900 dark:text-gray-300 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent">
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Issue</option>
                    <option value="refund">Refund Request</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Message</label>
                  <textarea required rows="4" className="w-full px-4 py-3 border dark:bg-gray-900 dark:text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"></textarea>
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

  )
}

export default Contacts
