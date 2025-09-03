import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'

const LayoutOne = () => {
  

    const Selector = useSelector((state)=>state.myRedux.value)

    const navigate = useNavigate()


    useEffect(()=>{
      if(Selector === null){
        navigate('/login')
      }
    },[])

   
  
  
  return (
  <>
    

    <Navbar />
    <Outlet />
    
    
    
    
    </>
  )
}

export default LayoutOne