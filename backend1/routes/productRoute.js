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
  reorderProducts,
  getaProductDashboard,
  getAllRatings,

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
router.put("/rating", rating);
router.get("/getallratings", getAllRatings);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.get("/:handle", getaProduct);
router.get("/dashboard/:id",getaProductDashboard)
router.post("/reorder",reorderProducts); // Add the reorder route

router.get("/", getAllProduct);

router.get("/:collectionName", getAllProduct);

router.delete("/:id", authMiddleware, isAdmin, deleteProduct);


module.exports = router;
