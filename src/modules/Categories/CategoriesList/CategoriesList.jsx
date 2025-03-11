import React, { useEffect, useState } from 'react'
import Header from '../../Shared/Header/Header'
import axios from 'axios'
import NoData from '../../Shared/Nodata/NoData'
import { baseURL, Categories_Urls, privateAxiosInstance } from '../../../Services/Urls/Urls'
import imag from "../../../assets/images/recipes_img (1).png"
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'
import { ColorRing } from 'react-loader-spinner'
import CategoryData from '../CategoryData/CategoryData'
import { useForm } from 'react-hook-form'

export default function CategoriesList() {

  const [categoriesList, setCategoriesList] = useState([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [editCategory, setEditCategory] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  

   let getAllCategories=async()=>{
    try {
      let response =await privateAxiosInstance.get(`${Categories_Urls.Get_Category}/?pageSize=10&pageNumber=1` )
      setCategoriesList(response?.data.data)
      
    } catch (error) {
      console.log(error)
    }
    finally{
      setIsLoading(false)
    }
   }


   let deleteCategory=async(id)=>{
    try {
      let response =await privateAxiosInstance.delete(`${baseURL}category/${categoryId}`)
      // setCategoriesList(response?.data.data)
      getAllCategories()
       toast.success(response?.data.message||"Deleted Successfully")
      setShowDeleteConfirm(false)

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
    <div className="content">
    <Header title={"Categories item"} description={"You can now add your items that any user can order it from the Application and you can edit"} img={imag}/>
   <div className=' title d-flex justify-content-between p-4 mx-3'>
   <div className="description ">
      <h3>Categories Table Details</h3>
      <span>You can check all details</span>
    </div>
    <button onClick={()=>{setShowAddCategory(true)}} className='btn mt-3 p-3 btn-color text-white'>Add New Category</button>
   </div>
  
    <div className="container-fluid my-5">
       <table className="table table-striped ">
  <thead >
    <tr >
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Creation Date</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {isLoading?(( <div  className=" d-flex  align-items-center justify-content-center text-center ">
   <ColorRing
     visible={true}
     height="80"
     width="80"
     ariaLabel="color-ring-loading"
     wrapperStyle={{}}
     wrapperClass="color-ring-wrapper"
     colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
     /></div>)):categoriesList&&categoriesList.length >0 ? categoriesList.map((category,idx)=>
     <tr key={idx}>
     <th scope="row">{category.id}</th>
     <td>{category.name}</td>
     <td>{category.creationDate}</td>
     <td>
     <td className="dropdown">
     <i className="fa-solid fa-ellipsis" data-bs-toggle="dropdown"></i>
     <ul className="dropdown-menu">
     <li> <i className="fa-solid fa-hurricane  m-3 icon-color"></i>View</li>
     <li onClick={()=>{setEditCategory(category.name);setShowAddCategory(true); setCategoryId(category.id)}}><i className="fa fa-edit m-3 icon-color"></i>Edit</li>
     <li onClick={()=> {setShowDeleteConfirm(true);setCategoryId(category.id)}}> <i className="fa fa-trash m-3 icon-color " ></i> Delete</li>
    </ul>
    </td>
     </td>
   </tr> 
  ): < NoData/> }
   
  </tbody>
  {showAddCategory&&<CategoryData editCategory={editCategory} categoryId={categoryId} getAllCategories={getAllCategories} setCategoryId={setCategoryId} closeMadel={()=>setShowAddCategory(false)}/>}
   
</table>
       </div>
       {showDeleteConfirm&&
       <DeleteConfirmation close={()=>setShowDeleteConfirm(false)} confirmDelete={deleteCategory}/>
       }
       
       </div>
    </>
  )
}


