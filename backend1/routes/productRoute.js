const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
  reorderProducts
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { productImgResize, uploadPhoto } = require("../middlewares/uploadImage");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);

router.put("/:handle", authMiddleware, isAdmin, updateProduct);
router.get("/:handle", getaProduct);
router.put("/reorder", authMiddleware, isAdmin, reorderProducts); // Add the reorder route

router.get("/", getAllProduct);
router.get("/:collectionName", getAllProduct);

router.delete("/:handle", authMiddleware, isAdmin, deleteProduct);


module.exports = router;
