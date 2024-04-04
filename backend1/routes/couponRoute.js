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

router.post("/",isAdmin, createCoupon);
router.get("/", getAllCoupons);
router.get("/:id", getCoupon);
router.put("/:id", isAdmin, updateCoupon);
router.delete("/:id", isAdmin, deleteCoupon);

module.exports = router;
