import React, { useEffect, useState } from 'react'
import NoData from '../../Shared/Nodata/NoData'
import Header from '../../Shared/Header/Header'
import axios from 'axios'
import {  baseURL, Categories_Urls, img_URL, privateAxiosInstance, Recipes_Urls, Tags_Urls } from '../../../Services/Urls/Urls'
import imag from "../../../assets/images/recipes_img (1).png"
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'
import { ColorRing } from 'react-loader-spinner'
import Pagination from '../../Shared/Pagination/Pagination'
import { Link, useNavigate } from 'react-router-dom'

export default function RecipesList() {

  const [recipesList, setRecipesList] = useState([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteById, setDeleteById] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [arrayOfPages, setArrayOfPages] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [nameValue, setNameValue] = useState("")
  const [tagValue, setTagValue] = useState("")
  const [categoryValue, setCategoryValue] = useState("")
  const navigate=useNavigate()


   let getAllRecipes=async(pageSize ,pageNumber ,name,tag ,cat)=>{
    try {
      let response =await privateAxiosInstance.get(Recipes_Urls.Get_Recipes,{
        params:{pageSize :pageSize,
          pageNumber :pageNumber,
          name:name ,
          tagId:tag,
          categoryId:cat
      } 
        
      } )
      setRecipesList(response?.data.data);
      console.log(response);
      
       setArrayOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_,index)=>index+1));
      // console.log(arrayOfPages);
      
    } catch (error) {
      console.log(error)
    }
    finally{
      setIsLoading(false)
    }
   }

   let deleterecipe=async()=>{
    try {
      let response =await axios.delete(`${baseURL}Recipe/${deleteById}`,{
        headers:{Authorization:localStorage.getItem("token")}  
      }
      )
      toast.success(response?.data.message||"Deleted Successfully")
      getAllRecipes(3,1)
      setShowDeleteConfirm(false)
      // setRecipesList(response?.data.data)
    
    } catch (error) {
      console.log(error)
      // toast.error(error)
    }
   }

   let getNameValue=(e)=>{
   setNameValue(e.target.value)
   getAllRecipes(3,1,e.target.value,tagValue,categoryValue)
 
   }

   let getTagValue=(e)=>{
    setTagValue(e.target.value)
   getAllRecipes(3,1,nameValue,e.target.value,categoryValue)
   }

   let getCategoryValue=(e)=>{
    setCategoryValue(e.target.value)
   getAllRecipes(3,1,nameValue ,tagValue,e.target.value)
   }

    let getAllCategories=async()=>{
       try {
         let response =await privateAxiosInstance.get(Categories_Urls.Get_Category)
         setCategories(response?.data.data)
        //  console.log(response);
       } catch (error) {
         console.log(error)
       }
      
      }
    let getAllTags=async()=>{
       try {
         let response =await privateAxiosInstance.get(Tags_Urls.Get_Tags)
         setTags(response?.data)
        //  console.log(response);
         
         
       } catch (error) {
         console.log(error)
       }
      
      }
   

   useEffect(()=>{
    getAllRecipes(4,1)
    getAllCategories()
    getAllTags()
  }
       ,[]
      )
   

  return (
    <>
     <div className="content mx-3">
     <Header title={"Recipes items"} description={"You can now add your items that any user can order it from the Application and you can edit"} img={imag}/>
       <div className=' title d-flex justify-content-between p-4 mx-3'>
       <div className="description ">
          <h3>Recipe Table Details</h3>
          <span>You can check all details</span>
        </div>
        <button onClick={()=>(navigate('/dashboard/recipes/new-recipe'))}  className='btn btn-color text-white mt-3 p-3'>Add New Item</button>
       </div>
        <div className="searchSection container-fluid">
          <div className="row">
            {/* search input */}
            <div className="col-md-6">
              <div className="input-group border-1 border rounded">
                <span className='input-group-text border-0 bg-transparent ' id='search-addon'>
                  <i className='fas fa-search'></i>
                </span>
                <input type="text" className='form-control border-0 rounded' onChange={getNameValue} placeholder='Search' aria-label='Search' aria-describedby='search-addon'/>
              </div>
            </div>
            {/* SELECT TAGS */}
            <div className="col-md-3">
            <select className="form-select" aria-label="Default select example" onChange={getTagValue}>
             <option selected>Tags</option>
             {tags?.map(({id,name})=>(
              <option key={id} defaultValue={id} >{name}</option>
             ))}
            </select>
            </div>
            {/* SELECT CATEGORY */}
            <div className="col-md-3">
            <select className="form-select" onChange={getCategoryValue} aria-label="Default select example">
              <option selected>Category</option>
               {categories?.map(({id,name})=>(
              <option key={id} defaultValue={id}>{name}</option>
             ))}
</select>
            </div>
          </div>
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
      {isLoading?((
        <tr  className=" d-flex  align-items-center justify-content-center text-center ">
     <td>
     { <ColorRing
     visible={true}
     height="80"
     width="80"
     ariaLabel="color-ring-loading"
     wrapperStyle={{}}
     wrapperClass="color-ring-wrapper"
     colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
     /> }
     </td>
     </tr>)):recipesList&&recipesList.length >0 ? recipesList.map((recipe,idx)=>
         <tr key={idx}>
         {/* <th scope="row">{recipe.id}</th> */}
         <td>{recipe.name}</td>
         <td><img width={"50"} src={recipe.imagePath?`${img_URL}${recipe.imagePath}`:imag}alt="ٌ Recipe image" /></td>
         <td>{recipe.price}EG</td>
         <td>{recipe.description }</td>
         <td> {recipe.tag.name}</td>
         <td>{recipe.category[0].name}</td>
         
         <td className="dropdown">
       <i className="fa-solid fa-ellipsis " data-bs-toggle="dropdown"></i>
       <ul className="dropdown-menu">
        <li > <i className="fa-solid fa-hurricane  m-3 icon-color"></i>View</li>
        <li  onClick={()=>(navigate(`/dashboard/recipes/${recipe.id}`))} > <i className="fa fa-edit m-3 icon-color"></i>Edit</li> 
        <li onClick={()=>{setShowDeleteConfirm(true);setDeleteById(recipe.id)}}> <i className="fa fa-trash m-3 icon-color " ></i> Delete</li>
       </ul>
         </td>
       </tr> 
      ):<NoData/> }
       
      </tbody>
           </table>
           </div>
           {showDeleteConfirm&&( <DeleteConfirmation close={()=>setShowDeleteConfirm(false)} confirmDelete={deleterecipe}/>)}
          
           </div> 
           <Pagination arrayOfPages={arrayOfPages} PaginationFun={getAllRecipes}/>
    </>
  )
}


