const express=require("express");
const { createUser, loginUser, getAllUsers, getSingleUser, deleteAUser, updateUser, blockUser, unBlockUser, handleRefreshToken, logOut, updatePassword,forgotPasswordToken, resetPassword } = require("../controller/userCtrl");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware");
const router=express.Router();
router.post("/register",createUser);
router.post("/login",loginUser)
router.post("/forgot-password-token",forgotPasswordToken)
router.put("/reset-password/:token",resetPassword)
router.put("/password",authMiddleware,updatePassword)
router.get("/allusers",getAllUsers)
router.get("/refresh",handleRefreshToken)
router.get("/logout",logOut) 
router.get("/:id",authMiddleware,isAdmin,getSingleUser)
router.delete("/:id",deleteAUser)
router.put("/edit-user",authMiddleware,updateUser)
router.put("/block-user/:id",authMiddleware,isAdmin,blockUser)
router.put("/unblock-user/:id",authMiddleware,isAdmin,unBlockUser)

module.exports=router;
