import axios from "axios";

export const baseURL="https://upskilling-egypt.com:3006/api/v1/";
export const publicAxiosInstance =axios.create({baseURL})

export const privateAxiosInstance =axios.create({baseURL,  headers:{Authorization:localStorage.getItem("token")}})

export const USERS_URLS={
    Login :`Users/Login`,
    Register :`Users/Register`,
    Delete_User :(id)=>`Users/${id}`,
    Forget_Pass :`Users/Reset/Request`,
    Reset_Pass :`Users/Reset`
}
export const Categories_Urls={
    Get_Category :`Category`,
  
}
export const Recipes_Urls={
    Get_Recipes :`Recipe`,
  
}