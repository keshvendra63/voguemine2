const express = require("express");
const {
  createCollection,
  updateCollection,
  deleteCollection,
  getCollection,
  getallCollection,
  uploadImages,
  getaCollection,
  createCollection1,
  updateCollection1,
  deleteCollection1,
  getCollection1,
  getallCollection1,
  uploadImages1,
  getaCollection1,
  createCollection2,
  updateCollection2,
  deleteCollection2,
  getCollection2,
  getallCollection2,
  uploadImages2,
  getaCollection2
} = require("../controller/collectionCtrl");
const { collectionImgResize, uploadPhoto } = require("../middlewares/uploadImage");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 1),
  collectionImgResize,
  uploadImages
);
router.put(
  "/get1/lvl/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 1),
  collectionImgResize,
  uploadImages1
);
router.put(
  "/get2/vh/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 1),
  collectionImgResize,
  uploadImages2
);
router.get("/web/:handle", getaCollection);
router.post("/", authMiddleware, isAdmin, createCollection);
router.put("/:id", authMiddleware, isAdmin, updateCollection);
router.delete("/:id", authMiddleware, isAdmin, deleteCollection);
router.get("/:id", getCollection);
router.get("/", getallCollection);
router.get("/get1/lvl/web/:handle", getaCollection1);
router.post("/get1/lvl/", authMiddleware, isAdmin, createCollection1);
router.put("/get1/lvl/:id", authMiddleware, isAdmin, updateCollection1);
router.delete("/get1/lvl/:id", authMiddleware, isAdmin, deleteCollection1);
router.get("/get1/lvl/:id", getCollection1);
router.get("/get1/lvl/", getallCollection1);
router.get("/get2/vh/web/:handle", getaCollection2);
router.post("/get2/vh/", authMiddleware, isAdmin, createCollection2);
router.put("/get2/vh/:id", authMiddleware, isAdmin, updateCollection2);
router.delete("/get2/vh/:id", authMiddleware, isAdmin, deleteCollection2);
router.get("/get2/vh/:id", getCollection2);
router.get("/get2/vh/", getallCollection2);

module.exports = router;
