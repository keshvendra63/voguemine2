import { createSlice,createAsyncThunk,createAction} from "@reduxjs/toolkit";
import {productService} from './productService'
import {toast} from 'react-toastify'

export const getAllProducts=createAsyncThunk("product/get",async(data,thunkAPI)=>{
    try{
        return await productService.getProducts(data)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const getProducts = createAsyncThunk(
    "product/get-all-products",
    async (data,thunkAPI) => {
      try {
        return await productService.getAllProducts(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const addToWishlist=createAsyncThunk("product/wishlist",async(prodId,thunkAPI)=>{
    try{
        return await productService.addToWishList(prodId)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const rating = createAsyncThunk(
    "product/rateProduct",
    async ({ prodId, star, comment, name, email }, thunkAPI) => {
        try {
            return await productService.rateProduct(prodId, star, comment, name, email);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const getAProduct=createAsyncThunk("product/getSingleProduct",async(handle,thunkAPI)=>{
    try{
        return await productService.getProduct(handle)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const resetState = createAction("Reset_all");

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
        builder.
        addCase(getAllProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.product=action.payload;
        })
        .addCase(getAllProducts.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(getProducts.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.prdt=action.payload;
        }).addCase(getProducts.rejected,(state,action)=>{
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
            if(state.isSuccess===true){
                toast.info("Added To Wishlist Successfully")
            }
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
        .addCase(rating.pending,(state)=>{
            state.isLoading=true;
        }).addCase(rating.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.postRating=action.payload;
            if(state.isSuccess===true){
                toast.success("Rating Posted")
            }
        }).addCase(rating.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(resetState, () => productState);

    }
})


export default productSlice.reducer