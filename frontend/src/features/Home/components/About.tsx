import React from 'react';
import { Link } from 'react-router-dom';
import HomeLogo from '../../../assets/images/HomeLogo.png'

const About = () => {
  return (
    <section className="bg-gradient-to-r from-green-100 via-green-200 to-green-100 text-blue py-20 z-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        
        {/* Text Section */}
        <div className="lg:w-1/2 text-left">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Welcome to LinkUp
          </h1>

          <p className="mt-4 text-lg sm:text-xl max-w-3xl">
            A community-connect portal designed for teams and individuals 
            to collaborate, track issues, and connect with like-minded people.
          </p>

          <div className="mt-6">
            <Link
              to="/login"
              className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg shadow-md 
              hover:bg-gray-100 transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0 lg:ml-80">
          <img 
            src={HomeLogo} 
            alt="About LinkUp"
            className="w-full max-w-md lg:max-w-lg rounded-lg object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default About;
