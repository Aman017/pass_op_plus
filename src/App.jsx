import { useState } from 'react'
import Navbar from './componets/Navbar'
import Manager from './componets/Manager'
import Footer from './componets/Footer'

import './App.css'

function App() {


  return (
    <>
   <Navbar/>
   <div className="min-h-[89vh]">
      <Manager/>
   </div>
      <Footer/>
    </>
  )
}

export default App
