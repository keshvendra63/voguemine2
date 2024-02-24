import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {authService} from './userService'
import {toast} from 'react-toastify'

export const registerUser=createAsyncThunk("auth/register",async(userData,thunkAPI)=>{
    try{
        return await authService.register(userData)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const loginUser=createAsyncThunk("auth/login",async(userData,thunkAPI)=>{
    try{
        return await authService.login(userData)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const getUserWishlistProduct=createAsyncThunk("auth/wishlist",async(thunkAPI)=>{
    try{
        return await authService.getUserWishlist()
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const getUserCartProduct=createAsyncThunk("auth/cart/get",async(thunkAPI)=>{
    try{
        return await authService.getUserCart()
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const addToCart=createAsyncThunk("auth/cart/add",async(cartData,thunkAPI)=>{
    try{
        return await authService.addToCarts(cartData)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const createAnOrder=createAsyncThunk("auth/cart/create-order",async(orderDetails,thunkAPI)=>{
    try{
        return await authService.createOrder(orderDetails)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const removeFromCart=createAsyncThunk("auth/cart/product/delete",async(cartItemId,thunkAPI)=>{
    try{
        return await authService.removeProductFromCart(cartItemId)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateQuantityFromCart=createAsyncThunk("auth/cart/product/update",async(cartDetail,thunkAPI)=>{
    try{
        return await authService.updateProductQuantityFromCart(cartDetail)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
const initialState={
    user:getCustomerfromLocalStorage,
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading=true;
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createUser=action.payload;
            if(state.isSuccess===true){
                toast.info("User Created Successfully")
            }

        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
                toast.error(action.error)
            }
        })
        builder.addCase(loginUser.pending,(state)=>{
            state.isLoading=true;
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user=action.payload;
            if(state.isSuccess===true){
                localStorage.setItem("token",action.payload.token)
                toast.info("User Logged In Successfully")
            }

        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
                toast.error(action.error)
            }
        })
        builder.addCase(getUserWishlistProduct.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getUserWishlistProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.wishlist=action.payload;

        }).addCase(getUserWishlistProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        builder.addCase(getUserCartProduct.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getUserCartProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cartProducts=action.payload;

        }).addCase(getUserCartProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(addToCart.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cartProduct=action.payload;
            state.message="Product added to Cart";
        }).addCase(addToCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(removeFromCart.pending,(state)=>{
            state.isLoading=true;
        }).addCase(removeFromCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.removeFromCart=action.payload;
            state.message="Product removed from Cart";
        }).addCase(removeFromCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(updateQuantityFromCart.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateQuantityFromCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedCartProduct=action.payload;
            state.message="Quantity Updated";
        }).addCase(updateQuantityFromCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(createAnOrder.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createAnOrder.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.orderedProduct=action.payload;
            state.message="Order Placed";
        }).addCase(createAnOrder.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }
})


export default authSlice.reducer
