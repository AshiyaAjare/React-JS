import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-gray-700 min-h-screen py-16 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-lavender-300 rounded-full opacity-20 -ml-32 -mt-32"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-100 rounded-full opacity-20 -mr-40 -mb-40"></div>

      {/* Content container */}
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <h1 className="text-4xl font-bold sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-400 mb-8 text-center">
          Contact Us
        </h1>

        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-xl shadow-lg p-8 mb-10">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 mb-6">
              Have questions about LinkUp? We're here to help!
            </p>
            <div className="inline-block bg-indigo-100 rounded-lg px-6 py-5 mb-4">
              <h2 className="text-xl font-medium text-indigo-600 mb-1">Email Us</h2>
              <a 
                href="mailto:ashiya.ajare@gmail.com" 
                className="text-lg font-semibold text-indigo-500 hover:text-indigo-600 transition duration-300"
              >
                ashiya.ajare@gmail.com
              </a>
            </div>
            <p className="text-gray-600">
              We typically respond to all inquiries within 24-48 hours.
            </p>
          </div>

          
        </div>
        
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-block bg-indigo-400 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-indigo-500 transform hover:-translate-y-1 transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Wave decoration at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default ContactUs;