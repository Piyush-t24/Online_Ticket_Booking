import React from 'react'

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-gray-300">
      <p className="text-lg text-white  text-center pt-5 ">
        **This website is for project purposes only and has no affiliation with any museum or other official sites.**
      </p>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-12">
          <div className='flex flex-col justify-center items-center text-center'>
            <h3 className="text-2xl font-bold text-white mb-6">HeritageHub</h3>
            <p className="mb-6 w-1/2">Your trusted platform for discovering and booking tickets to the best events worldwide.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-white transition duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-white transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-white transition duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition duration-300">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-300">Browse Events</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-300">Partner With Us</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition duration-300">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-300">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-300">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-300">Refund Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-300">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© 2024 HeritageHub. All rights reserved.</p>
            </div>
            {/* <!-- Logo --> */}
            <div className="flex-shrink-0 flex items-center">
              <h3 className="text-2xl font-light text-white">HeritageHub</h3>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
