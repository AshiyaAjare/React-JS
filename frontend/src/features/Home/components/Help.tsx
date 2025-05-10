import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Shared/components/Navbar';

const Help = () => {
  return (
    <>
    <Navbar/>
    <section className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-gray-700 min-h-screen py-16 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-lavender-300 rounded-full opacity-20 -ml-32 -mt-32"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-100 rounded-full opacity-20 -mr-40 -mb-40"></div>

      {/* Content container */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h1 className="text-4xl font-bold sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-400 mb-8">
          Help Center
        </h1>

        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">How do I create an account?</h3>
              <p className="text-gray-600">
                Click on the "Get Started" button on our homepage, then follow the registration process. 
                You'll need to provide a valid email address and create a password.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">How can I join a team?</h3>
              <p className="text-gray-600">
                You can join a team by receiving and accepting an invitation from a team administrator, 
                or by searching for public teams in the "Discover" section of your dashboard.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">How do I track issues?</h3>
              <p className="text-gray-600">
                Navigate to the "Issues" tab in your team workspace. From there, you can create new issues, 
                assign them to team members, set priorities, and track their progress.
              </p>
            </div>
          </div>
        </div>
        </div>

      {/* Wave decoration at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
    </>
  );
};

export default Help;