import axios from 'axios'
import {base_url, config} from '../../utils/axiosConfig'
const register=async(userData)=>{
    const response= await axios.post(`${base_url}user/register`,userData)
    
    if(response.data){
        if (response.data) {
            localStorage.setItem("customer", JSON.stringify(response.data));
          }
        return response.data
    }
}
const login=async(userData)=>{
    const response= await axios.post(`${base_url}user/login`,userData)
    if(response.data){
        if (response.data) {
            localStorage.setItem("customer", JSON.stringify(response.data));
          }
       
        return response.data
    }
}

const createOrder=async(orderDetails)=>{
    const response=await axios.post(`${base_url}user/cart/create-order`,orderDetails)
    if(response.data){
       
        return response.data
    }
}
const getOtp=async(number)=>{
    const response=await axios.get(`${base_url}user/sendOtp/${number}`)
    if(response.data){
       
        return response.data
    }
}

const createAbondend=async(abondendDetails)=>{
    const response=await axios.post(`${base_url}user/create-abondend`,abondendDetails)
    if(response.data){
       
        return response.data
    }
}

const getOrders=async()=>{
    const response=await axios.get(`${base_url}user/getmyorders`,config)
    if(response.data){
       
        return response.data
    }
}

const updateUser=async(data)=>{
    const response=await axios.put(`${base_url}user/edit-user`,data.data,data.config2)
    if(response.data){
       
        return response.data
    }
}
const forgotPassToken=async(data)=>{
    const response=await axios.post(`${base_url}user/forgot-password-token`,data)
    if(response.data){
       
        return response.data
    }
}

const sitemap=async()=>{
    const response=await axios.get(`${base_url}user/sitemap.xml`)
    if(response.data){
       
        return response.data
    }
}
export const authService={
    register,
    login,
    createOrder,
    getOrders,
    updateUser,
    forgotPassToken,
    createAbondend,
    getOtp,
    sitemap
}