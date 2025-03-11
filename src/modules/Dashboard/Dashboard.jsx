import React from 'react'
import Header from '../Shared/Header/Header'
import imag from "../../assets/images/home_img (2).png"
import ChangePass from '../Authentication/Change-pass/ChangePass'


export default function Dashboard() {
  return (
    <>
    <Header title={"Welcome Ayaa !"} description={"This is a welcoming screen for the entry of the application , you can now see the options"} img={imag}/>
    <h1>Dashboard</h1>
 

    </>
  )
}
