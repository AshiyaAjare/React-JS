import React from 'react'
import Linkedin from "../../../../public/icons/linkedin.svg";
import Github from "../../../../public/icons/github.svg";

const Footer = () => {
  return (
    <footer className="bottom-0 left-0 z-20 w-screen p-0 bg-white border-t border-gray-200 shadow-sm">
    <div className="bg-gradient-to-r from-green-100 via-green-200 to-green-100 shadow-md">
    <div className="w-full mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between items-center">
          <div className="flex gap-4">
            {/* {TODO: External social links} */}
            <img src={Linkedin} alt="Linkedin" className="h-10 w-10" />
            <img src={Github} alt="Github" className="h-10 w-10" />
          </div>
          <p className="mt-4 font-medium text-sm text-white-600">
            &copy; 2025 LinkUp. All rights reserved.
          </p>
          <p className="font-medium text-sm text-white-600">
            Made with ❤️ by Ashiya Ajare
          </p>
        </div>
      </div>
    </div>
    </footer>
  )
}

export default Footer