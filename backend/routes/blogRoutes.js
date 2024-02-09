const express=require("express");
const { createBlog, updateBlog, getSingleBlog, getAllBlogs, deleteABlog, likeBlog, dislikeBlog,uploadImages } = require("../controller/blogController");
const {isAdmin,authMiddleware}=require("../middleware/authMiddleware")
const { uploadPhoto, blogImgResize } = require("../middleware/uploadImages")
const router=express.Router();

router.post("/",authMiddleware,isAdmin,createBlog)
router.put("/upload/:id",authMiddleware,isAdmin,uploadPhoto.array("images",2),blogImgResize,uploadImages)
router.put("/likes",authMiddleware,likeBlog)
router.put("/dislikes",authMiddleware,dislikeBlog)
router.put("/:id",authMiddleware,isAdmin,updateBlog)
router.delete("/:id",authMiddleware,isAdmin,deleteABlog)
router.get("/:id",getSingleBlog)
router.get("/",getAllBlogs)

module.exports=router