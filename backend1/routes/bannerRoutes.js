const express = require("express");
const {
  createBanner,
  updateBanner,
  deleteBanner,
  getallBanners,
  uploadImages,
  getBanner,
  createBanner1,
  updateBanner1,
  deleteBanner1,
  getallBanners1,
  uploadImages1,
  getBanner1,
  createBanner2,
  updateBanner2,
  deleteBanner2,
  getallBanners2,
  uploadImages2,
  getBanner2
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
router.put(
  "/get1/lvl/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 1),
  bannerImgResize,
  uploadImages1
);
router.post("/get1/lvl/", authMiddleware, isAdmin, createBanner1);
router.put("/get1/lvl/:id", authMiddleware, isAdmin, updateBanner1);
router.get("/get1/lvl/:id", authMiddleware, isAdmin, getBanner1);

router.delete("/get1/lvl/:id", authMiddleware, isAdmin, deleteBanner1);
router.get("/get1/lvl/", getallBanners1);
router.put(
  "/get2/vh/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 1),
  bannerImgResize,
  uploadImages2
);
router.post("/get2/vh/", authMiddleware, isAdmin, createBanner2);
router.put("/get2/vh/:id", authMiddleware, isAdmin, updateBanner2);
router.get("/get2/vh/:id", authMiddleware, isAdmin, getBanner2);

router.delete("/get2/vh/:id", authMiddleware, isAdmin, deleteBanner2);
router.get("/get2/vh/", getallBanners2);

module.exports = router;
