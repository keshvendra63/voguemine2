const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  uploadImages,
  getBlogWeb,
  createBlog1,
  updateBlog1,
  getBlog1,
  getAllBlogs1,
  deleteBlog1,
  uploadImages1,
  getBlogWeb1,
  createBlog2,
  updateBlog2,
  getBlog2,
  getAllBlogs2,
  deleteBlog2,
  uploadImages2,
  getBlogWeb2,
} = require("../controller/blogCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImage");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages
);

router.put("/:id", authMiddleware, isAdmin, updateBlog);

router.get("/:id", getBlog);
router.get("/web/:handle", getBlogWeb);

router.get("/", getAllBlogs);

router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

router.post("/get1/lvl/", authMiddleware, isAdmin, createBlog1);
router.put(
  "/get1/lvl/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages1
);

router.put("/get1/lvl/:id", authMiddleware, isAdmin, updateBlog1);

router.get("/get1/lvl/:id", getBlog1);
router.get("/get1/lvl/web/:handle", getBlogWeb1);

router.get("/get1/lvl/", getAllBlogs1);

router.delete("/get1/lvl/:id", authMiddleware, isAdmin, deleteBlog1);
router.post("/get2/vh/", authMiddleware, isAdmin, createBlog2);
router.put(
  "/get2/vh/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages2
);

router.put("/get2/vh/:id", authMiddleware, isAdmin, updateBlog2);

router.get("/get2/vh/:id", getBlog2);
router.get("/get2/vh/web/:handle", getBlogWeb2);

router.get("/get2/vh/", getAllBlogs2);

router.delete("/get2/vh/:id", authMiddleware, isAdmin, deleteBlog2);

module.exports = router;
