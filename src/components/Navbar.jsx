import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between bg-[#081216] text-white py-2 h-14 items-center">
            <div className="logo flex items-center">
                <span className='font-bold text-2xl mx-4'>TaskTrack</span>
                <img src="list.png" alt="list" width={30} height={30} />
            </div>
      </nav>
    </div>
  )
}

export default Navbar
