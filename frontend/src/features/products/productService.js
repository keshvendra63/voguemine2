import axios from 'axios'
import {base_url, config} from '../../utils/axiosConfig'

const getProducts=async(data)=>{
    
    let url = `${base_url}product?page=${data.page}&limit=${data.limit}`;

    // Check if collectionName is provided
    if (data && data.collectionName) {
        url += `&collectionName=${data.collectionName}`;
    }

    // Add pagination parameters

    try {
        const response = await axios.get(url);
        
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error appropriately
        throw error;
    }
}
const getAllProducts = async () => {
    const response = await axios.get(`${base_url}product?limit=5000`);
  
    return response.data;
  };


const addToWishList=async(prodId)=>{
    const response= await axios.put(`${base_url}product/wishlist`,{prodId},config)
    if(response.data){
        return response.data
    }
}

const getProduct=async(handle)=>{
    const response= await axios.get(`${base_url}product/${handle}`)
    if(response.data){
        return response.data
    }
}
export const productService={
    getProducts,
    addToWishList,
    getProduct,
    getAllProducts
}