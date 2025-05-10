import React, { useState } from "react";
import Sidebar from "../../Users/components/Sidebar"
import Header from "../../Users/components/Header";
import { Outlet } from "react-router-dom";

const QueryDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-lavender-300 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-200 rounded-full opacity-10 blur-3xl"></div>
          
          {/* Main content */}
          <div className="relative z-10">
            
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default QueryDashboard;