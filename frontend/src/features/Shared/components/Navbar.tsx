import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  

  return (
    <div className="bg-white shadow-md z-10 py-2">
      <div className="w-screen mx-auto max-w-[100%] px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full gap-10">
          <p className="text-2xl font-bold text-green-900">
            LinkUp
          </p>
          <div>
            <Link to="/" className="text-medium text-green-900 px-4  py-2 font-bold">Home</Link>
            <Link to="/" className="text-medium text-green-900 px-4  py-2 font-bold ml-4">Help</Link>
            <Link to="/" className="text-medium text-green-900 px-4  py-2 font-bold ml-4">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar