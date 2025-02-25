import React, { useEffect, useState } from 'react'
import Header from '../../Shared/Header/Header'
import axios from 'axios'
import NoData from '../../Shared/Nodata/NoData'
import { baseURL, Categories_Urls, privateAxiosInstance } from '../../../Services/Urls/Urls'
import imag from "../../../assets/images/recipes_img (1).png"

export default function CategoriesList() {

  const [categoriesList, setCategoriesList] = useState([])
   let getAllCategories=async()=>{
    try {
      let response =await privateAxiosInstance.get(`${Categories_Urls.Get_Category}/?pageSize=10&pageNumber=1`,{
        headers:{Authorization:localStorage.getItem("token")}  
      }
      )
      setCategoriesList(response?.data.data)
      
    } catch (error) {
      console.log(error)
    }
   }


   let deleteCategory=async(id)=>{
    try {
      let response =await axios.delete(`${baseURL}category/${id}`,{
        headers:{Authorization:localStorage.getItem("token")}  
      }
      )
    
      setCategoriesList(response?.data.data)
    } catch (error) {
      console.log(error)
    }
   }



   useEffect(()=>{
    getAllCategories()}
    ,[]
   )

   

  return (
    <>
    
    <Header title={"Categories item"} description={"You can now add your items that any user can order it from the Application and you can edit"} img={imag}/>


   <div className=' title d-flex justify-content-between p-4'>
   <div className="description ">
      <h3>Categories Table Details</h3>
      <span>You can check all details</span>
    </div>
    <button className='btn btn-success'>Add New Category</button>
   </div>
   
    <div className="container-fluid my-5">
       <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Creation Date</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {categoriesList&&categoriesList.length >0 ? categoriesList.map((category)=>
     <tr>
     <th scope="row">{category.id}</th>
     <td>{category.name}</td>
     <td>{category.creationDate}</td>
     <td>
     <i className="fa fa-trash text-danger mx-2" onClick={()=>deleteCategory(category.id)}></i>
     <i className="fa fa-edit text-warning"></i>
     </td>
   </tr> 
  ): < NoData/> }
   
  </tbody>
</table>
       </div>
   
    </>
  )
}
