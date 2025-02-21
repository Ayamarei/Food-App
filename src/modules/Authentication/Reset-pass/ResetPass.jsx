import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../../assets/images/logo.png"
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
// import 'react-toastify/dist/reactToastify.css'

export default function Login() {

  let {register, formState:{errors}, handleSubmit} =useForm();
  let navigate = useNavigate()
  const onSubmit= async(data)=>{
    try {
    let respons= await  axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset",data)
    console.log(data);
     toast.success(respons.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
              });
    navigate("/login")
    
    
    } catch (error) {
       toast.error(error.response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
              });
      console.log(error.response.data.message);
      
    }
    
    
  }
  return <>
       <div className='auth-container '>
      
        <div className="container-fluid bg-layer">
          <div className='row vh-100 justify-content-center align-items-center '>
            <div className="col-md-5 bg-white rounded-3 px-5 py-3">
              <div className='logo-container text-center'>
                <img className="w-50"  src={logo} alt="" />
                 </div>
                 <div className="title">
                  <h3 className='h5'> Reset  Password</h3>
                  <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
                 </div>
                 <form onSubmit={handleSubmit(onSubmit)} >
                 <div className="input-group mb-2">
                   <span className="input-group-text" id="basic-addon1">
                   <i className='fa fa-envelope' aria-hidden="true"></i>
                   </span>
                   <input {...register("email",{
                    required:"Email is require",
                    pattern:{value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message:"Email is invalid"
                    }
                    

                   })} type="text" class="form-control input-group-text" placeholder="Enter your E-mail"  aria-describedby="basic-addon1"/>
                 </div>
                 {errors.email&&<span className='text-danger'>{errors.email.message}</span>}
                

                 <div className="input-group mb-2 mt-3">
                   <span className="input-group-text" id="basic-addon1">
                   <i className='fa fa-lock' aria-hidden="true"></i>
                   </span>
                   <input {...register("seed" ,{required:"Otp is required"})} type="text" class="form-control input-group-text" placeholder="OTP" aria-label="Username" aria-describedby="basic-addon1"/>
                 </div>
                 {errors.seed&&<span className='text-danger'>{errors.seed.message}</span>}

                 <div className="input-group mb-2 mt-3">
                   <span className="input-group-text" id="basic-addon1">
                   <i className='fa fa-lock' aria-hidden="true"></i>
                   </span>
                   <input {...register("password" ,{required:"Password is required",minLength:{value:5,message:"password must be at least 5 characters "}})} type="password" class="form-control input-group-text" placeholder="New Password" aria-label="Username" aria-describedby="basic-addon1"/>
                 </div>
                 {errors.password&&<span className='text-danger'>{errors.password.message}</span>}

                 <div className="input-group mb-2 mt-3">
                   <span className="input-group-text" id="basic-addon1">
                   <i className='fa fa-lock' aria-hidden="true"></i>
                   </span>
                   <input {...register("confirmPassword" ,{required:"Confirm Password is required",minLength:{value:5,message:"password must be at least 5 characters "}})} type="password" class="form-control input-group-text" placeholder="Confirm New Password" aria-label="Username" aria-describedby="basic-addon1"/>
                 </div>
                 {errors.password&&<span className='text-danger'>{errors.password.message}</span>}
                
                 <button className='w-100 btnn rounded-2 py-2 my-3'>Login</button>
                 </form>
            </div>
          </div>
        </div>
       </div>
    </>
  
  
}
