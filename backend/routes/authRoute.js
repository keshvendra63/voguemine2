const express=require("express");
const { createUser, loginUser, getAllUsers, getSingleUser, deleteAUser, updateUser, blockUser, unBlockUser, handleRefreshToken, logOut, updatePassword,forgotPasswordToken, resetPassword, loginAdmin, getWishlist, saveAddress, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus } = require("../controller/userCtrl");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware");
const { updateOne } = require("../models/orderModel");
const router=express.Router();
router.post("/register",createUser);
router.post("/login",loginUser)
router.post("/admin-login",loginAdmin)
router.post("/cart",authMiddleware,userCart)
router.post("/cart/cashorder",authMiddleware,createOrder)
router.get("/cart",authMiddleware,getUserCart)
router.delete("/empty-cart",authMiddleware,emptyCart)
router.post("/forgot-password-token",forgotPasswordToken)
router.put("/reset-password/:token",resetPassword)
router.put("/password",authMiddleware,updatePassword)
router.get("/allusers",getAllUsers)
router.get("/refresh",handleRefreshToken)
router.get("/logout",logOut) 
router.get("/wishlist",authMiddleware,getWishlist)
router.get("/get-orders",authMiddleware,getOrders)
router.post("/cart/applycoupon",authMiddleware,applyCoupon)
router.get("/:id",authMiddleware,isAdmin,getSingleUser)
router.delete("/:id",deleteAUser)
router.put("/edit-user",authMiddleware,updateUser)
router.put("/save-address",authMiddleware,saveAddress)
router.put("/block-user/:id",authMiddleware,isAdmin,blockUser)
router.put("/unblock-user/:id",authMiddleware,isAdmin,unBlockUser)
router.put("/order/update-order/:id",authMiddleware,isAdmin,updateOrderStatus)

module.exports=router;
