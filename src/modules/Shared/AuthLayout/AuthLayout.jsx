import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from "../../../assets/images/logo.png"

export default function AuthLayout() {
  return <>
     <div className='auth-container '>
  <div className="container-fluid bg-layer">
          <div className='row vh-100 justify-content-center align-items-center '>
            <div className="col-10 col-md-8 col-lg-6 bg-white rounded-3 px-5 py-3">
              <div className='logo-container text-center'>
                <img className="w-50"  src={logo} alt="" />
                 </div>
                 <Outlet/>
                 </div>
                   </div>
                    </div>
                    </div>
                    
  
  </>
  
  
}
