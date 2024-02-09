const express=require("express");

const {isAdmin,authMiddleware}=require('../middleware/authMiddleware');
const { createBlogCategory, updateBlogCategory, deleteBlogCategory, getSingleBlogCategory, getAllBlogCategories } = require("../controller/blogCatController");
const router=express.Router();

router.post("/",authMiddleware,isAdmin,createBlogCategory)
router.put("/:id",authMiddleware,isAdmin,updateBlogCategory)
router.delete("/:id",authMiddleware,isAdmin,deleteBlogCategory)
router.get("/:id",getSingleBlogCategory)
router.get("/",getAllBlogCategories)

module.exports=router