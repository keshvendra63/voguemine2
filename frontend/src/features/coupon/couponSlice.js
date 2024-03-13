import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {couponService} from './couponService'
import {toast} from 'react-toastify'


export const getAllCoupons=createAsyncThunk("coupon/get",async(thunkAPI)=>{
    try{
        return await couponService.getCoupons()
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const getACoupon=createAsyncThunk("coupon/getSingleCoupon",async(id,thunkAPI)=>{
    try{
        return await couponService.getCoupon(id)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
const couponState={
    coupon:"",
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}
export const couponSlice=createSlice({
    name:"coupon",
    initialState:couponState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCoupons.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllCoupons.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.coupon=action.payload;
        }).addCase(getAllCoupons.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(getACoupon.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getACoupon.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.getSingleCoupon=action.payload;
        }).addCase(getACoupon.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }
})


export default couponSlice.reducer