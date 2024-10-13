import React from 'react'

const Footer = () => {
  return (

    <div className='bg-[#112021] text-white flex flex-col justify-center items-center w-full'>
        
        <div className="logo font-bold">
        <span className='text-[#698fe9]'>&lt;</span> 

           <span>Pass</span> 
           <span className='text-[#698fe9]'>OP+ / &gt;</span> 

        </div>
        <div className='flex justify-center items-center' > Created with <img className='w-7 mx-2' src="icons/heart.png" alt="" /> by Aman
        </div>
    </div>
  )
}

export default Footer
