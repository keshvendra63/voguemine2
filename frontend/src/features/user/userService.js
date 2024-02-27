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

const getUserWishlist=async()=>{
    const response= await axios.get(`${base_url}user/wishlist`,config)
    if(response.data){
       
        return response.data
    }
}
const getUserCart=async()=>{
    const response= await axios.get(`${base_url}user/cart`,config)
    if(response.data){
       
        return response.data
    }
}
const removeProductFromCart=async(cartItemId)=>{
    const response= await axios.delete(`${base_url}user/delete-product-cart/${cartItemId}`,config)
    if(response.data){
       
        return response.data
    }
}

const addToCarts=async(cartData)=>{
    const response= await axios.post(`${base_url}user/cart`,cartData,config)
    if(response.data){
        return response.data
    }
}
const updateProductQuantityFromCart=async(cartDetail)=>{
    const response= await axios.delete(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,config)
    if(response.data){
       
        return response.data
    }
}

const createOrder=async(orderDetails)=>{
    const response=await axios.post(`${base_url}user/cart/create-order`,orderDetails,config)
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

const emptyCart=async(data)=>{
    const response=await axios.delete(`${base_url}user/empty-cart`,config)
    if(response.data){
       
        return response.data
    }
}

export const authService={
    register,
    login,
    getUserWishlist,
    addToCarts,
    getUserCart,
    removeProductFromCart,
    updateProductQuantityFromCart,
    createOrder,
    getOrders,
    updateUser,
    forgotPassToken,
    emptyCart
}