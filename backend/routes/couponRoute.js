const express=require("express");

const {isAdmin,authMiddleware}=require('../middleware/authMiddleware');
const { createCoupon,deleteCoupon,updateCoupon,getSingleCoupon,getAllCoupons} = require("../controller/couponController");
const router=express.Router();

router.post("/",authMiddleware,isAdmin,createCoupon)
router.put("/:id",authMiddleware,isAdmin,updateCoupon)
router.delete("/:id",authMiddleware,isAdmin,deleteCoupon)
router.get("/:id",getSingleCoupon)
router.get("/",getAllCoupons)

module.exports=router