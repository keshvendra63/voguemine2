import axios from 'axios'
import {base_url, config} from '../../utils/axiosConfig'

const getProducts=async(data)=>{
    console.log(data)
    const response= await axios.get(`${base_url}product?${data?.sort?`sort=${data?.sort}&&`:""}${data?.page?`page=${data?.page}&&`:""}${data?.limit?`limit=${data?.limit}&&`:""}`)
    if(response.data){
        return response.data
    }
}
const addToWishList=async(prodId)=>{
    const response= await axios.put(`${base_url}product/wishlist`,{prodId},config)
    if(response.data){
        return response.data
    }
}

const getProduct=async(id)=>{
    const response= await axios.get(`${base_url}product/${id}`)
    if(response.data){
        return response.data
    }
}
export const productService={
    getProducts,
    addToWishList,
    getProduct
}