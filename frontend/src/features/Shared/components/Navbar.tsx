import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../app/authSlice";
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear auth state
    localStorage.removeItem("token"); // Remove JWT token
    navigate("/login"); // Redirect to login page
  };


  return (
    <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 shadow-md z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/login" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-400">
            LinkUp
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/app" className="text-gray-700 hover:text-indigo-500 font-medium transition duration-300">Home</Link>
            <Link to="/help" className="text-gray-700 hover:text-indigo-500 font-medium transition duration-300">Help</Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-500 font-medium transition duration-300">Contact Us</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
                onClick={handleLogout} 
                className="flex items-center text-gray-600 hover:bg-pink-100 hover:text-pink-700 rounded-lg px-4 py-3 transition-colors group"
              >
              <LogOut size={20} className="mr-3 text-pink-400 group-hover:text-pink-600" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;