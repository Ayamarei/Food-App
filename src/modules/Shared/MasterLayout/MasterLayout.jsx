import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
// import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'


export default function MasterLayout({loginData}) {

  
  return (
   <>

   <div className="d-flex vh-100">
    <div >
    <SideBar/>
    </div>
     
    <div className="w-100 d-flex flex-column">
    <Navbar loginData={loginData}/>
    {/* <Header/> */}
    <div className='overflow-y-auto'> 
      <Outlet context={{ loginData }}/>
    </div>
    </div>
   </div>

   </>
  )
}
