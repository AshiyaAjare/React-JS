import React from 'react';
import { Link } from 'react-router-dom';
import HomeLogo from '../../../assets/images/HomeLogo.png';

const About = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-gray-700 py-20 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-lavender-300 rounded-full opacity-20 -ml-32 -mt-32"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-100 rounded-full opacity-20 -mr-40 -mb-40"></div>
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center relative z-10">
        {/* Text Section */}
        <div className="lg:w-1/2 text-left">
          <h1 className="text-4xl font-bold sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-400">
            Welcome to LinkUp
          </h1>
          <p className="mt-6 text-lg sm:text-xl max-w-3xl leading-relaxed text-gray-600">
            A community-connect portal designed for teams and individuals
            to collaborate, track issues, and connect with like-minded people.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              to="/dashboard"
              className="bg-indigo-400 text-white font-semibold px-8 py-3 rounded-lg shadow-md
              hover:bg-indigo-500 transform hover:-translate-y-1 transition duration-300"
            >
              Get Started
            </Link>

          </div>
          
          
        </div>
        
        {/* Image Section with subtle floating animation */}
        <div className="lg:w-1/2 flex justify-center mt-12 lg:mt-0">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-200 bg-opacity-20 rounded-full blur-2xl transform scale-110"></div>
            <img
              src={HomeLogo}
              alt="About LinkUp"
              className="w-full max-w-md lg:max-w-lg rounded-2xl object-cover shadow-lg transform hover:scale-105 transition duration-500 relative z-10"
            />
            
            {/* Decorative elements around the image - much softer now */}
            <div className="absolute -top-4 -right-4 bg-pink-200 h-16 w-16 rounded-full opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 bg-indigo-200 h-20 w-20 rounded-full opacity-40 animate-pulse delay-300"></div>
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
  );
};

export default About;