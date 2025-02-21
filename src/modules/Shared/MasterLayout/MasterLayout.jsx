import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
   <>

   <div className="d-flex">
    <div className="w-25 bg-info">
      <Sidebar/>
    </div>
    <div className="w-75 bg-danger">
    <Navbar/>
    <Header/>
    <Outlet/>
    </div>
   </div>
   
   </>
  )
}
