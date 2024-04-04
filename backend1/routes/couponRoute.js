const express = require("express");
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getCoupon
} = require("../controller/couponCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/",isAdmin,  authMiddleware, createCoupon);
router.get("/", getAllCoupons);
router.get("/:id", getCoupon);
router.put("/:id", isAdmin, authMiddleware, updateCoupon);
router.delete("/:id", isAdmin, authMiddleware, deleteCoupon);

module.exports = router;
