const express = require("express");
const {
  createBanner,
  updateBanner,
  deleteBanner,
  getallBanners,
  uploadImages,
  getBanner
} = require("../controller/bannerCtrl");
const { bannerImgResize, uploadPhoto } = require("../middlewares/uploadImage");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 1),
  bannerImgResize,
  uploadImages
);
router.post("/", authMiddleware, isAdmin, createBanner);
router.put("/:id", authMiddleware, isAdmin, updateBanner);
router.get("/:id", authMiddleware, isAdmin, getBanner);

router.delete("/:id", authMiddleware, isAdmin, deleteBanner);
router.get("/", getallBanners);

module.exports = router;
