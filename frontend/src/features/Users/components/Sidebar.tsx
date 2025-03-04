import React, { useState } from "react";
import { Home, LogOut, User, MessageSquare, ChevronDown, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../app/authSlice";
import { Link } from 'react-router-dom';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const [profileOpen, setProfileOpen] = useState(true);
  const [queriesOpen, setQueriesOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear auth state
    localStorage.removeItem("token"); // Remove JWT token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className={`fixed lg:relative lg:block z-40 ${sidebarOpen ? "block" : "hidden"}`}>
      <div className="h-full w-64 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 shadow-lg overflow-y-auto transition-all">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-indigo-100">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-2 shadow-md">
              <span className="text-white font-bold">L</span>
            </div>
            <Link to="/app"><span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">LinkUp</span></Link>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-indigo-500 hover:text-purple-700">
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="py-4 px-4">
          <p className="text-xs font-medium text-indigo-400 mb-4 px-2">MENU</p>

          <div className="space-y-1">
            <a className="flex items-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 rounded-lg px-4 py-3 transition-colors">
              <Home size={20} className="mr-3 text-indigo-400" />
              <span className="font-medium">Dashboard</span>
            </a>

            {/* Profile Dropdown */}
            <div>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`w-full flex items-center justify-between text-left ${profileOpen ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-purple-100 hover:text-purple-700"} rounded-lg px-4 py-3 transition-colors`}
              >
                <div className="flex items-center">
                  <User size={20} className={`mr-3 ${profileOpen ? "text-purple-500" : "text-indigo-400"}`} />
                  <span className="font-medium">User Profile</span>
                </div>
                <ChevronDown size={16} className={`transition-transform ${profileOpen ? "rotate-180 text-purple-500" : "text-indigo-400"}`} />
              </button>

              {profileOpen && (
                <div className="pl-12 py-2 space-y-1 bg-white bg-opacity-50 rounded-lg my-1 backdrop-blur-sm">
                  <Link to="/dashboard" className="block text-purple-700 hover:bg-purple-100 rounded-lg px-4 py-2 transition-colors">
                    Personal Info
                  </Link>
                  
                </div>
              )}
            </div>

            {/* Queries Dropdown */}
            <div>
              <button
                onClick={() => setQueriesOpen(!queriesOpen)}
                className={`w-full flex items-center justify-between text-left ${queriesOpen ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-indigo-100 hover:text-indigo-700"} rounded-lg px-4 py-3 transition-colors`}
              >
                <div className="flex items-center">
                  <MessageSquare size={20} className={`mr-3 ${queriesOpen ? "text-indigo-500" : "text-indigo-400"}`} />
                  <span className="font-medium">Queries & Responses</span>
                </div>
                <ChevronDown size={16} className={`transition-transform ${queriesOpen ? "rotate-180 text-indigo-500" : "text-indigo-400"}`} />
              </button>

              {queriesOpen && (
                <div className="pl-12 py-2 space-y-1 bg-white bg-opacity-50 rounded-lg my-1 backdrop-blur-sm">
                  <Link to="/queries" className="block text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 rounded-lg px-4 py-2 transition-colors">
                    View All Queries
                  </Link>
                  <Link to="/queries/create" className="block text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 rounded-lg px-4 py-2 transition-colors">
                    Create New Query
                  </Link>
                  <Link to="/queries/user-responses" className="block text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 rounded-lg px-4 py-2 transition-colors">
                    Pending Responses
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-indigo-100">
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

export default Sidebar;