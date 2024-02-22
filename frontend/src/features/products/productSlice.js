import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {productService} from './productService'
import {toast} from 'react-toastify'


export const getAllProducts=createAsyncThunk("product/get",async(thunkAPI)=>{
    try{
        return await productService.getProducts()
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const addToWishlist=createAsyncThunk("product/wishlist",async(prodId,thunkAPI)=>{
    try{
        return await productService.addToWishList(prodId)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const getAProduct=createAsyncThunk("product/getSingleProduct",async(id,thunkAPI)=>{
    try{
        return await productService.getProduct(id)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
const productState={
    product:"",
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}
export const productSlice=createSlice({
    name:"product",
    initialState:productState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.product=action.payload;
        }).addCase(getAllProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(addToWishlist.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addToWishlist.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.addToWishList=action.payload;
            state.message="Product added to Wishlist";
        }).addCase(addToWishlist.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(getAProduct.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.getSingleProduct=action.payload;
        }).addCase(getAProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }
})


export default productSlice.reducer