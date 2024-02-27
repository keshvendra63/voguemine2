const express = require("express");
const {
  createCollection,
  updateCollection,
  deleteCollection,
  getCollection,
  getallCollection,
} = require("../controller/collectionCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCollection);
router.put("/:id", authMiddleware, isAdmin, updateCollection);
router.delete("/:id", authMiddleware, isAdmin, deleteCollection);
router.get("/:id", getCollection);
router.get("/", getallCollection);

module.exports = router;
