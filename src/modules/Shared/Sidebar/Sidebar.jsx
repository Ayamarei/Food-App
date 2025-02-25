import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import image from "../../../assets/images/side-logo.png"

export default function SideBar() {

  let navigate= useNavigate()
  const [isCollaps, setIsCollaps] = useState(false)
  let toggelCollaps=()=>{
    setIsCollaps(! isCollaps)
  }
  let logedOut=()=>{
    localStorage.removeItem("token")
   navigate("/login")
  }
  return (
    <> 
    <div className='sidebar-container'>
    <Sidebar  collapsed={isCollaps} >
  <Menu>
    <MenuItem onClick={toggelCollaps} className='m-3 logo' icon={<img  src={image}/>}></MenuItem>
    <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
    <MenuItem icon={ <i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-receipt"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-table-cells"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-unlock"></i>} component={<Link to="/change-password" />}> Change Password </MenuItem>
    <MenuItem  icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={logedOut}>Log Out</MenuItem>
  </Menu>
</Sidebar>
    </div>
      
    </>
    
  )
}
