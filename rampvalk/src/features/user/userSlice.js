import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { authService } from './userService'
import { toast } from 'react-toastify'
export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        return await authService.register(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        return await authService.login(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getUserWishlistProduct = createAsyncThunk("auth/wishlist", async (thunkAPI) => {
    try {
        return await authService.getUserWishlist()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getUserCartProduct = createAsyncThunk("auth/cart/get", async (thunkAPI) => {
    try {
        return await authService.getUserCart()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const addToCart = createAsyncThunk("auth/cart/add", async (cartData, thunkAPI) => {
    try {
        return await authService.addToCarts(cartData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createAnOrder = createAsyncThunk("auth/cart/create-order", async (orderDetails, thunkAPI) => {
    try {
        return await authService.createOrder(orderDetails)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const createAbondend = createAsyncThunk("auth/create-abondend", async (abondendDetails, thunkAPI) => {
    try {
        return await authService.createAbondend(abondendDetails)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUserOrders = createAsyncThunk("auth/order/get", async (thunkAPI) => {
    try {
        return await authService.getOrders()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const removeFromCart = createAsyncThunk("auth/cart/product/delete", async (cartItemId, thunkAPI) => {
    try {
        return await authService.removeProductFromCart(cartItemId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deleteCart = createAsyncThunk("auth/cart/delete", async (thunkAPI) => {
    try {
        return await authService.emptyCart()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateQuantityFromCart = createAsyncThunk("auth/cart/product/update", async (cartDetail, thunkAPI) => {
    try {
        return await authService.updateProductQuantityFromCart(cartDetail)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const updateProfile = createAsyncThunk("auth/profile/update", async (data, thunkAPI) => {
    try {
        return await authService.updateUser(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const sendOtp = createAsyncThunk("auth/otp", async (number, thunkAPI) => {
    try {
        return await authService.getOtp(number)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const forgotPasswordToken = createAsyncThunk("auth/password/token", async (data, thunkAPI) => {
    try {
        return await authService.forgotPassToken(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const siteMap = createAsyncThunk("auth/sitemap", async (thunkAPI) => {
    try {
        return await authService.sitemap()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const resetState = createAction("Reset_all");

const getCustomerfromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;
const initialState = {
    user: getCustomerfromLocalStorage,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createUser = action.payload;
            if (state.isSuccess === true) {
                toast.success("User Created Successfully")
            }

        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isError === true) {
                toast.error(action.error)
            }
        })
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            if (state.isSuccess === true) {
                localStorage.setItem("token", action.payload.token)
                toast.success("User Logged In Successfully")
            }

        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isError === true) {
                toast.error(action.error)
            }
        })
        builder.addCase(getUserWishlistProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(getUserWishlistProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.wishlist = action.payload;

        }).addCase(getUserWishlistProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        builder.addCase(getUserCartProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(getUserCartProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cartProducts = action.payload;

        }).addCase(getUserCartProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            }).addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProduct = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Add to Cart Successfully")
                }
            }).addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(sendOtp.pending, (state) => {
                state.isLoading = true;
            }).addCase(sendOtp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.otp = action.payload;
                if (state.isSuccess === true) {
                    toast.success("OTP SEND SUCCESSFULLY")
                }
            }).addCase(sendOtp.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(siteMap.pending, (state) => {
                state.isLoading = true;
            }).addCase(siteMap.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.sitemap = action.payload;
                
            }).addCase(siteMap.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
               
            })
            .addCase(removeFromCart.pending, (state) => {
                state.isLoading = true;
            }).addCase(removeFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.removeFromCart = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Remove from Cart Successfully")
                }
            }).addCase(removeFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(updateQuantityFromCart.pending, (state) => {
                state.isLoading = true;
            }).addCase(updateQuantityFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCartProduct = action.payload;
                if (state.isSuccess === true) {
                    toast.info("Quantity Updated Successfully")
                }
            }).addCase(updateQuantityFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(createAnOrder.pending, (state) => {
                state.isLoading = true;
            }).addCase(createAnOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orderedProduct = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Order Placed")
                    const ad=JSON.parse(localStorage.getItem("temp"))
                    const items=ad?.orderItems?.map((item)=>{return item?.product})
                    window.fbq('track', 'Purchase', {
                        content_name: 'Checkout',
                        content_category: 'Page',
                        content_ids: 'purchase',
                        content_type: 'page',
                        value: ``,
                        currency: 'INR'
                    });
                   
                }
            }).addCase(createAnOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(createAbondend.pending, (state) => {
                state.isLoading = true;
            }).addCase(createAbondend.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.abondendProduct = action.payload;
            }).addCase(createAbondend.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getUserOrders.pending, (state) => {
                state.isLoading = true;
            }).addCase(getUserOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getOrderedProduct = action.payload;
            }).addCase(getUserOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            }).addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedUser = action.payload;
                let currentUserData = JSON.parse(localStorage.getItem("customer"))
                let newUserData = {
                    _id: currentUserData?._id,
                    token: currentUserData?.token,
                    firstname: action?.payload?.firstname,
                    lastname: action?.payload?.lastname,
                    email: action?.payload?.email,
                    mobile: action?.payload?.mobile,
                }
                localStorage.setItem("customer", JSON.stringify(newUserData))
                state.user = newUserData
                toast.success("Profile Updated")
            }).addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(forgotPasswordToken.pending, (state) => {
                state.isLoading = true;
            }).addCase(forgotPasswordToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.token = action.payload;
            }).addCase(forgotPasswordToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCart.pending, (state) => {
                state.isLoading = true;
            }).addCase(deleteCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCart = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Removed")
                }
            }).addCase(deleteCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);

    }
})


export default authSlice.reducer

