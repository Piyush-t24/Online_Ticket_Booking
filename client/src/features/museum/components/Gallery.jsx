import React from 'react'

const Gallery = () => {
  return (
    <section id="Gallery" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 ">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4 dark:text-white">Museum Gallery</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group relative overflow-hidden rounded-lg shadow-lg Up">
            <img src="https://heritagehubimages.s3.us-east-2.amazonaws.com/uploads/f9747a4f-3a2e-4169-9e60-70f2895eb2b6" alt="Sarnath Museum" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 p-6">
                <h3 className="text-white text-xl font-bold">Museum Building</h3>
                <p className="text-neutral-200">Historical Architecture</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg shadow-lg Up">
            <div className="h-64 bg-neutral-200 dark:bg-gray-800 flex items-center justify-center">
              <svg className="w-20 h-20 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg shadow-lg Up">
            <div className="h-64 bg-neutral-200 dark:bg-gray-800 flex items-center justify-center">
              <svg className="w-20 h-20 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center ">
          <p className="text-neutral-600 mb-6 dark:text-gray-300">Experience the rich heritage and historical artifacts</p>
        </div>
      </div>
    </section>
  )
}

export default Gallery
