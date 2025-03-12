import React, { useEffect, useState } from 'react'
import Header from '../../Shared/Header/Header'
import NoData from '../../Shared/Nodata/NoData'
import { baseURL, img_URL, privateAxiosInstance, Users_Urls } from '../../../Services/Urls/Urls'
import imag from "../../../assets/images/recipes_img (1).png"
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'
import { Circles, ColorRing } from 'react-loader-spinner'



export default function UsersList() {
  const [usersList, setUsersList] = useState([])
   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [deleteById, setDeleteById] = useState(null)
     const [isLoading, setIsLoading] = useState(true)
 
    let getAllUsers=async()=>{
     try {
       let response =await privateAxiosInstance.get(`${Users_Urls.Get_Users}/?pageSize=10&pageNumber=1` )
       setUsersList(response?.data.data)
      //  console.log(response);
       
       
     } catch (error) {
       console.log(error)
     }
     finally{
       setIsLoading(false)
     }
    }
 
 
    let deleteUser=async(id)=>{
     try {
       let response =await privateAxiosInstance.delete(`${baseURL}users/${deleteById}`)
       // setCategoriesList(response?.data.data)
       getAllUsers()
        toast.success(response?.data.message||"Deleted Successfully")
       setShowDeleteConfirm(false)
 
     } catch (error) {
       console.log(error)
     }
    }
 
 
    useEffect(()=>{
      getAllUsers()}
     ,[]
    )
 
   return (
     <>
      <div className="content">
     <Header title={"Users List "} description={"You can now add your items that any user can order it from the Application and you can edit"} img={imag}/>
    <div className=' title d-flex justify-content-between p-4 mx-3'>
    <div className="description ">
       <h3>Users Table Details</h3>
       <span>You can check all details</span>
     </div>
    </div>
    
     <div className="container-fluid my-5">
        <table className="table table-striped ">
   <thead>
     <tr>
       <th scope="col">#</th>
       <th scope="col">Name</th>
       <th scope="col">Image </th>
       <th scope="col">country </th>
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
  /></div>)):usersList&&usersList.length >0 ? usersList.map((user,idx)=>
      <tr key={idx}>
      <th scope="row">{user.id}</th>
      <td>{user.userName}</td>
      <td><img width={"50"} src={user.imagePath?`${img_URL}${user.imagePath}`:imag}alt="ٌ Recipe image" /></td>
      <td>{user.country}</td>
      <td>
      <td className="dropdown">
      <i className="fa-solid fa-ellipsis" data-bs-toggle="dropdown"></i>
      <ul className="dropdown-menu">
      <li> <i className="fa-solid fa-hurricane  m-3 icon-color"></i>View</li>
      <li onClick={()=> {setShowDeleteConfirm(true);setDeleteById(user.id)}}> <i className="fa fa-trash m-3 icon-color " ></i> Delete</li>
     
     </ul>
     </td>
      </td>
    </tr> 
   ): < NoData/> }
    
   </tbody>
 </table>
        </div>
        {showDeleteConfirm&&
        <DeleteConfirmation close={()=>setShowDeleteConfirm(false)} confirmDelete={deleteUser}/>
        }
        
        </div>
     </>
   )
}
