//import { useState } from 'react'
import React from 'react'
import './App.css'
import Navbar from './features/Shared/components/Navbar'
import Footer from './features/Shared/components/Footer'
import Home from './features/Home/components/Home'
// import About from './features/Home/components/About'
// import BlobBackground from './features/Home/components/BlobBackground'
// import { RouterProvider } from "react-router-dom";
// import router from "./routes"; // Import your routes

function App() {
  

  return (
    //React Fragment
    <div className="overflow-x-hidden">
     <Navbar />
     {/* <BlobBackground/> */}
     <Home/>
     <Footer/>
     
    </div>
  )
}

export default App
