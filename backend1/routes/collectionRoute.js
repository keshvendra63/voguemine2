const express = require("express");
const {
  createCollection,
  updateCollection,
  deleteCollection,
  getCollection,
  getallCollection,
  uploadImages,
  getaCollection
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
router.get("/web/:handle", getaCollection);
router.post("/", authMiddleware, isAdmin, createCollection);
router.put("/:id", authMiddleware, isAdmin, updateCollection);
router.delete("/:id", authMiddleware, isAdmin, deleteCollection);
router.get("/:id", getCollection);
router.get("/", getallCollection);

module.exports = router;
