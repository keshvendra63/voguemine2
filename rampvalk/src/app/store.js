import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/user/userSlice'
import productReducer from '../features/products/productSlice'
import blogReducer from '../features/blogs/blogSlice'
import couponReducer from '../features/coupon/couponSlice'
import collectionReducer from '../features/collection/collectionSlice'
import bannerReducer from '../features/banner/bannerSlice'

export const store=configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
        blog:blogReducer,
        coupon:couponReducer,
        collection:collectionReducer,
        banner:bannerReducer
    },
})