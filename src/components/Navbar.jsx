import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex py-3 justify-between bg-emerald-400 text-white'>
        <div className="logo">
            <span className='font-bold mx-9 text-xl'>D!d Task ?</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all duration-50 '>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-50 '>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
