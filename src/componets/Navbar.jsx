import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[#112021] text-white sticky top-0 w-full  z-20'>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

        <div className="logo font-bold">
        <span className='text-[#698fe9]'>&lt;</span> 

           <span>Pass</span> 
           <span className='text-[#698fe9]'>OP+ / &gt;</span> 

        </div>
        <ul>
            <li className='flex gap-5'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
            </li>
        </ul>
    <button className='text-white bg-[#16515a] my-5 rounded-full flex justify-center items-center ring-white ring-1'>
  <img className='w-11 invert p-1' src="icons/social.png" alt="github icon" />
  <span className='font-bold px-2'> GitHub</span>
    </button>
        
        </div>
    </nav>
  )
}

export default Navbar
