import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import LayoutOne from './layout/LayoutOne'
import Home from './pages/Home'
import Login from './pages/Login'
import Registation from './pages/Registation'
import { ToastContainer } from 'react-toastify'
import './App.css'
import app from './Firebase.config'
import Bin from './pages/Bin'

const App = () => {

  const myRoute = createBrowserRouter(createRoutesFromElements(
    <Route >
      <Route path='/' element={<LayoutOne />}>
      <Route index element={<Home />} ></Route>
      <Route path='/bin' element={<Bin />} ></Route>
      </Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/registraion' element={<Registation />} ></Route>
    </Route>
  ))


  return (
    <>
    
     <ToastContainer />
    <RouterProvider router={myRoute} />
    

    
    </>
  )
}

export default App