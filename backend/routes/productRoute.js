const express=require("express")
const {isAdmin,authMiddleware}=require("../middleware/authMiddleware")
const { createProduct, getSingleProduct, getAllProducts, updateProduct, deleteAProduct, addToWishlist, rating, uploadImages } = require("../controller/productController")
const { uploadPhoto, productImgResize } = require("../middleware/uploadImages")
const router=express.Router()

router.post("/",authMiddleware,isAdmin,createProduct)
router.put("/upload/:id",authMiddleware,isAdmin,uploadPhoto.array("images",10),productImgResize,uploadImages)
router.get("/:id",getSingleProduct)
router.put("/wishlist",authMiddleware,addToWishlist)
router.put("/rating",authMiddleware,rating)
router.get("/",getAllProducts)
router.put("/:id",authMiddleware,isAdmin,updateProduct)
router.delete("/:id",authMiddleware,isAdmin,deleteAProduct)

module.exports=router