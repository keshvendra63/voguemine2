import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {blogService} from './blogService'
import {toast} from 'react-toastify'


export const getAllBlogs=createAsyncThunk("blogs/get",async(thunkAPI)=>{
    try{
        return await blogService.getBlogs()
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const getABlog=createAsyncThunk("blog/get",async(handle,thunkAPI)=>{
    try{
        return await blogService.getBlog(handle)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

const blogState={
    blog:"",
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}
export const blogSlice=createSlice({
    name:"blog",
    initialState:blogState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllBlogs.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllBlogs.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.blog=action.payload;
        }).addCase(getAllBlogs.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        builder.addCase(getABlog.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getABlog.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.singleBlog=action.payload;
        }).addCase(getABlog.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        
    }
})


export default blogSlice.reducer