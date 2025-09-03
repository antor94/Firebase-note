import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { GrLogout } from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
const Navbar = () => {


    const Selector = useSelector((state)=>state.myRedux.value)

  const removeItem = ()=>{
    localStorage.removeItem("userInfo")

  }


  return (
    <>
    
    
        {/* Top Bar */}
          <nav className=" flex items-center pb-[20px]  border-b bg-[#202124] text-white p-6 font-sans border-amber-50 justify-between">
            <Link to={'/'} className="text-2xl font-semibold">My Notes</Link>
    
    
              {/* Search Bar */}
              <div className= "w-[600px] relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  className="w-[80%] pl-10 pr-4 py-4 rounded-md text-sm outline-none  bg-[#525355] text-white placeholder-gray-400"
                />
              </div>

              <div className='flex gap-[24px] items-center'> 
                <RiDeleteBin6Line className='text-[24px]' />
                <IoHomeOutline className='text-[24px]' />

              </div>
    
              <div className='flex items-center gap-[20px]'>
              <div className='w-[40px] h-[40px] rounded-full bg-amber-50'><img src={Selector?.displayName} alt="" /></div>
              <h2 className='text-base font-normal font-sans '>{Selector?.displayName}</h2>
              </div>
              <Link onClick={removeItem} to={'/login'}><GrLogout className='text-[20px]' /></Link>
    
    
            </nav>
    
    </>
  )
}

export default Navbar