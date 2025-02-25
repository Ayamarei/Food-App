import React, { useEffect, useState } from 'react'
import NoData from '../../Shared/Nodata/NoData'
import Header from '../../Shared/Header/Header'
import axios from 'axios'
import {  baseURL, privateAxiosInstance, Recipes_Urls } from '../../../Services/Urls/Urls'
import imag from "../../../assets/images/recipes_img (1).png"

export default function RecipesList() {

  const [recipesList, setRecipesList] = useState([])
   let getAllRecipes=async()=>{
    try {
      let response =await privateAxiosInstance.get(`${Recipes_Urls.Get_Recipes}/?pageSize=5&pageNumber=1` )
      setRecipesList(response?.data.data)
      // console.log(response);
      
      
    } catch (error) {
      console.log(error)
    }
   }


   let deleterecipe=async(id)=>{
    try {
      let response =await axios.delete(`${baseURL}Recipe/${id}`,{
        headers:{Authorization:localStorage.getItem("token")}  
      }
      )
      setRecipesList(response?.data.data)
    
      
    } catch (error) {
      console.log(error)
    }
   }


   useEffect(()=>{
    getAllRecipes()}
       ,[]
      )
   

  return (
    <>
     <Header title={"Recipes items"} description={"You can now add your items that any user can order it from the Application and you can edit"} img={imag}/>
    
    
       <div className=' title d-flex justify-content-between p-4'>
       <div className="description ">
          <h3>Recipe Table Details</h3>
          <span>You can check all details</span>
        </div>
        <button className='btn btn-success'>Add New Item</button>
       </div>
       
        <div className="container-fluid my-5">
           <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Item Name</th>
          <th scope="col">Image</th>
          <th scope="col">Price</th>
          <th scope="col">Description </th>
          <th scope="col">Action </th>
         
        </tr>
      </thead>
      <tbody>
      {recipesList&&recipesList.length >0 ? recipesList.map((recipe)=>
         <tr>
         <th scope="row">{recipe.id}</th>
         <td>{recipe.name}</td>
         <td><img className='w-25' src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}alt="" /></td>
         <td>{recipe.price}</td>
         <td>{recipe.creationDate}</td>
         <td>
         <i className="fa fa-trash text-danger mx-2" onClick={()=>deleterecipe(recipe.id)}></i>
         <i className="fa fa-edit text-warning"></i>
         </td>
       </tr> 
      ):<NoData/> }
       
      </tbody>
    </table>
           </div>
    
    </>
  )
}


