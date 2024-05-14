import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {bannerService} from './bannerService'


export const getAllBanner=createAsyncThunk("banner/get-banner",async(thunkAPI)=>{
    try{
        return await bannerService.getBanner()
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

const bannerState={
    banner:"",
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}


export const bannerSlice=createSlice({
    name:"banner",
    initialState:bannerState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllBanner.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllBanner.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.banner=action.payload;
        }).addCase(getAllBanner.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
       
    }
})
export default bannerSlice.reducer