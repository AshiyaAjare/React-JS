import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 shadow-md z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-400">
            LinkUp
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-500 font-medium transition duration-300">Home</Link>
            <Link to="/help" className="text-gray-700 hover:text-indigo-500 font-medium transition duration-300">Help</Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-500 font-medium transition duration-300">Contact Us</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login" className="bg-white text-indigo-400 font-medium px-4 py-2 rounded-lg shadow-sm border border-indigo-100 hover:bg-gray-50 transition duration-300">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;