//import { useState } from 'react'
import React from 'react'
import './App.css'
import Navbar from './features/Shared/components/Navbar'
import Footer from './features/Shared/components/Footer'
import Home from './features/Home/components/Home'


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
