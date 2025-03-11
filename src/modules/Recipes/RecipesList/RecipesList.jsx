import React, { useEffect, useState } from 'react'
import NoData from '../../Shared/Nodata/NoData'
import Header from '../../Shared/Header/Header'
import axios from 'axios'
import {  baseURL, img_URL, privateAxiosInstance, Recipes_Urls } from '../../../Services/Urls/Urls'
import imag from "../../../assets/images/recipes_img (1).png"
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'
import { ColorRing } from 'react-loader-spinner'

export default function RecipesList() {

  const [recipesList, setRecipesList] = useState([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteById, setDeleteById] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
   let getAllRecipes=async()=>{
    try {
      let response =await privateAxiosInstance.get(`${Recipes_Urls.Get_Recipes}/?pageSize=5&pageNumber=1` )
      setRecipesList(response?.data.data)
      // console.log(response);
      
    } catch (error) {
      console.log(error)
    }
    finally{
      setIsLoading(false)
    }
   }

   let deleterecipe=async(id)=>{
    try {
      let response =await axios.delete(`${baseURL}Recipe/${deleteById}`,{
        headers:{Authorization:localStorage.getItem("token")}  
      }
      )
      toast.success(response?.data.message||"Deleted Successfully")
      getAllRecipes()
      setShowDeleteConfirm(false)
      // setRecipesList(response?.data.data)
    
      
    } catch (error) {
      console.log(error)
      // toast.error(error)
    }
   }


   useEffect(()=>{
    getAllRecipes()}
       ,[]
      )
   

  return (
    <>
     <div className="content">
     <Header title={"Recipes items"} description={"You can now add your items that any user can order it from the Application and you can edit"} img={imag}/>
       <div className=' title d-flex justify-content-between p-4 mx-3'>
       <div className="description ">
          <h3>Recipe Table Details</h3>
          <span>You can check all details</span>
        </div>
        <button className='btn btn-color text-white mt-3 p-3'>Add New Item</button>
       </div>
       
        <div className="container-fluid my-5 ">
           <table className="table table-striped">
      <thead>
        <tr>
          {/* <th scope="col">#</th> */}
          <th scope="col">Item Name</th>
          <th scope="col">Image</th>
          <th scope="col">Price</th>
          <th scope="col">Description </th>
          <th scope="col">Tag </th>
          <th scope="col">Category </th>
          <th scope="col"> </th>
        </tr>
      </thead>

      <tbody>
      {isLoading?((<div  className=" d-flex  align-items-center justify-content-center text-center ">
   <ColorRing
     visible={true}
     height="80"
     width="80"
     ariaLabel="color-ring-loading"
     wrapperStyle={{}}
     wrapperClass="color-ring-wrapper"
     colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
     /></div>)):recipesList&&recipesList.length >0 ? recipesList.map((recipe,idx)=>
         <tr key={idx}>
         {/* <th scope="row">{recipe.id}</th> */}
         <td>{recipe.name}</td>
         <td><img width={"50"} src={recipe.imagePath?`${img_URL}${recipe.imagePath}`:imag}alt="ٌ Recipe image" /></td>
         <td>{recipe.price}EG</td>
         <td>{recipe.description }</td>
         <td>tag</td>
         <td>{recipe.categoriesIds } category</td>
         <td>
         <td className="dropdown">
       <i className="fa-solid fa-ellipsis " data-bs-toggle="dropdown"></i>
       <ul className="dropdown-menu">
        <li > <i className="fa-solid fa-hurricane  m-3 icon-color"></i>View</li>
        <li> <i className="fa fa-edit m-3 icon-color"></i>Edit</li>
        <li onClick={()=>{setShowDeleteConfirm(true);setDeleteById(recipe.id)}}> <i className="fa fa-trash m-3 icon-color " ></i> Delete</li>
       </ul>
         </td>
         </td>
       </tr> 
      ):<NoData/> }
       
      </tbody>
           </table>
           </div>
           {showDeleteConfirm&&( <DeleteConfirmation close={()=>setShowDeleteConfirm(false)} confirmDelete={deleterecipe}/>)}
          
           </div> 
    </>
  )
}


