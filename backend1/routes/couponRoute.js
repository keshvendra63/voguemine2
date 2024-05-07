const express = require("express");
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getCoupon,
  createCoupon1,
  getAllCoupons1,
  updateCoupon1,
  deleteCoupon1,
  getCoupon1,
  createCoupon2,
  getAllCoupons2,
  updateCoupon2,
  deleteCoupon2,
  getCoupon2
} = require("../controller/couponCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", getAllCoupons);
router.get("/:id", getCoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);
router.post("/get1/lvl/", authMiddleware, isAdmin, createCoupon1);
router.get("/get1/lvl/", getAllCoupons1);
router.get("/get1/lvl/:id", getCoupon1);
router.put("/get1/lvl/:id", authMiddleware, isAdmin, updateCoupon1);
router.delete("/get1/lvl/:id", authMiddleware, isAdmin, deleteCoupon1);
router.post("/get2/vh/", authMiddleware, isAdmin, createCoupon2);
router.get("/get2/vh/", getAllCoupons2);
router.get("/get2/vh/:id", getCoupon2);
router.put("/get2/vh/:id", authMiddleware, isAdmin, updateCoupon2);
router.delete("/get2/vh/:id", authMiddleware, isAdmin, deleteCoupon2);

module.exports = router;
