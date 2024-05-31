import axios from 'axios'
import {base_url, config} from '../../utils/axiosConfig'

const getProducts=async(data)=>{
    
    let url = `${base_url}product?page=${data.page}&limit=${data.limit}&collectionName=${data.collectionName}&state=active`;

    // Check if collectionName is provided
    if (data && data.collectionName) {
        url += ``;
    }
    if (data && data.size) {
        url += `&size=${data.size}`;
    }
    if (data && data.sort) {
        url += `&sort=${data.sort}`;
    }
    if (data && data.color) {
        url += `&color=${data.color}`;
    }
    if (data && data.brand) {
        url += `&brand=${data.brand}`;
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
const getAllProducts = async (data) => {
    let url = `${base_url}product?search=${data && data.searchValue}&state=active&page=${data && data.page}&limit=${data && data.limit}&sort=${data && data.sort}`;

    // Check if collectionName is provided
    if (data && data.size) {
        url += `&size=${data.size}`;
    }
    if (data && data.color) {
        url += `&color=${data.color}`;
    }
    if (data && data.brand) {
        url += `&brand=${data.brand}`;
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
const getAllRatings=async()=>{
    const response= await axios.get(`${base_url}product/getallratings`)
    if(response.data){
        return response.data
    }
}
const rateProduct = async (prodId, star, comment, name, email) => {
    try {
        const response = await axios.put(`${base_url}product/rating`, { prodId, star, comment, name, email });
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error("Error rating product:", error);
        // Handle error appropriately
        throw error;
    }
}
export const productService={
    getProducts,
    addToWishList,
    getProduct,
    getAllProducts,
    rateProduct,
    getAllRatings
}