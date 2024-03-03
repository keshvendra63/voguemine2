import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/cutomers/customerSlice";
import productReducer from "../features/product/productSlice";
import bCategoryReducer from "../features/bcategory/bcategorySlice";
import blogReducer from "../features/blogs/blogSlice";
import collectionReducer from "../features/collection/collectionSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    bCategory: bCategoryReducer,
    blogs: blogReducer,
    collection: collectionReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    coupon: couponReducer,
  },
});
