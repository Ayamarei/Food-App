import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './modules/Shared/AuthLayout/AuthLayout'
import Login from './modules/Authentication/Login/Login.jsx'
import ForgetPass from './modules/Authentication/Forget-pass/ForgetPass'
import Register from './modules/Authentication/Register/Register'
import ResetPass from './modules/Authentication/Reset-pass/ResetPass'
import RecipesList from './modules/Recipes/RecipesList/RecipesList'
import RecipeData from './modules/Recipes/RecipeData/RecipeData'
import Dashboard from './modules/Dashboard/Dashboard'
import MasterLayout from './modules/Shared/MasterLayout/MasterLayout'
import NotFound from './modules/Shared/NotFound/NotFound'
import CategoriesList from './modules/Categories/CategoriesList/CategoriesList'
import CategoryData from './modules/Categories/CategoryData/CategoryData'
import UsersList from './modules/Users/UsersList/UsersList'
import VerifyAccount from './modules/Authentication/Verify-account/VerifyAccount.jsx'
import { Bounce, ToastContainer } from 'react-toastify'


function App() {
 
  
  const routes=createBrowserRouter([{
    path:"",
    element:<AuthLayout/>,
    errorElement:<NotFound/>,
    children:[
      {index:true, element:<Login/>},
      {path:"login", element:<Login/>},
      {path:"forget-password", element:<ForgetPass/>},
      {path:"register", element:<Register/>},
      {path:"reset-password", element:<ResetPass/>},
      {path:"verify-account", element:<VerifyAccount/>},
    ]
  },

  {
    path:"/dashboard",
    element:<MasterLayout/>,
    errorElement:<NotFound/>,
    children:[
      {index:true, element:<Dashboard/>},
      {path:"recipes", element:<RecipesList/>},
      {path:"recipe-data", element:<RecipeData/>},
      {path:"categories", element:<CategoriesList/>},
      {path:"category-data", element:<CategoryData/>},
      {path:"users", element:<UsersList/>},
    ]
  }

])

  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick={false}
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
  transition={Bounce}/>
    
    </>
  )
}

export default App
