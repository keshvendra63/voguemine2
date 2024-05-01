import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {collectionService} from './colletionService'


export const getAllCollection=createAsyncThunk("collection/get",async(thunkAPI)=>{
    try{
        return await collectionService.getCollection()
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const getACollection=createAsyncThunk("collection/single-get",async(data,thunkAPI)=>{
    try{
        return await collectionService.getaCollection(data)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
const collectionState={
    collection:"",
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}


export const collectionSlice=createSlice({
    name:"collection",
    initialState:collectionState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCollection.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllCollection.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.collection=action.payload;
        }).addCase(getAllCollection.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(getACollection.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getACollection.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.singleCollection=action.payload;
        }).addCase(getACollection.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }
})
export default collectionSlice.reducer