import React from 'react';
import Linkedin from "../../../../public/icons/linkedin.svg";
import Github from "../../../../public/icons/github.svg";

const Footer = () => {
  return (
    <footer className="bottom-0 left-0 z-20 w-screen p-0 bg-white border-t border-gray-200 shadow-sm">
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 shadow-md">
        <div className="w-full mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-400">
                LinkUp
              </div>
              <p className="text-gray-600 text-sm">
                Connect. Collaborate. Create.
              </p>
            </div>
            
            <div className="flex gap-4 items-center">
              <a href="#" className="transform hover:scale-110 transition-transform duration-300">
                <div className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                  <img src={Linkedin} alt="Linkedin" className="h-6 w-6" />
                </div>
              </a>
              <a href="#" className="transform hover:scale-110 transition-transform duration-300">
                <div className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                  <img src={Github} alt="Github" className="h-6 w-6" />
                </div>
              </a>
              <a href="#" className="transform hover:scale-110 transition-transform duration-300">
                <div className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
              </a>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <p className="text-gray-600 text-sm">
                &copy; 2025 LinkUp. All rights reserved.
              </p>
              <p className="text-gray-600 text-sm flex items-center gap-1">
                Made with <span className="text-pink-400">❤️</span> by Ashiya Ajare
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;