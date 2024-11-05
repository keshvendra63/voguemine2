const Coupon = require("../models/couponModel");
const Coupon1 = require("../models/couponModel1");
const Coupon2 = require("../models/couponModel2");

const validateMongoDbId = require("../utils/validateMongodbId");
const asynHandler = require("express-async-handler");

const validateCoupon = async (req, res) => {
  try {
      const { name, totalAmount, customerType, cartItemCount, customerEmail } = req.body;

      // Find the coupon based on the name and status
      const coupon = await Coupon.findOne({
          name: name.toUpperCase(),
          status: "active",
          customertype: customerType,
      });

      if (!coupon) return res.status(404).json({ message: "Coupon not found or inactive." });

      // Check if the coupon is expired
      if (moment().isAfter(moment(coupon.expiry))) {
          return res.status(400).json({ message: "Coupon has expired." });
      }

      // Validate based on discount type
      let discountAmount = 0;
      let isValid = true;
      
      if (coupon.discounttype === "freeShip") {
          discountAmount = 0;
      } else if (coupon.discounttype === "buyX") {
          if (coupon.minItem && cartItemCount >= coupon.minItem) {
              discountAmount = coupon.discount.includes("%") 
                  ? (parseFloat(coupon.discount) / 100) * totalAmount 
                  : parseInt(coupon.discount);
          } else {
              isValid = false;
          }
      } else if (coupon.discounttype === "order") {
          discountAmount = coupon.discount.includes("%") 
              ? (parseFloat(coupon.discount) / 100) * totalAmount 
              : parseInt(coupon.discount);
      }

      if (isValid) {
          res.status(200).json({ message: "Coupon valid", discountAmount, discountType: coupon.discounttype });
      } else {
          res.status(400).json({ message: "Coupon criteria not met." });
      }

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};

const createCoupon = asynHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllCoupons = asynHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCoupon = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatecoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCoupon = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletecoupon = await Coupon.findByIdAndDelete(id);
    res.json(deletecoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const getCoupon = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getAcoupon = await Coupon.findById(id);
    res.json(getAcoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const createCoupon1 = asynHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon1.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllCoupons1 = asynHandler(async (req, res) => {
  try {
    const coupons = await Coupon1.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCoupon1 = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatecoupon = await Coupon1.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatecoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCoupon1 = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletecoupon = await Coupon1.findByIdAndDelete(id);
    res.json(deletecoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const getCoupon1 = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getAcoupon = await Coupon1.findById(id);
    res.json(getAcoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const createCoupon2 = asynHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon2.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllCoupons2 = asynHandler(async (req, res) => {
  try {
    const coupons = await Coupon2.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCoupon2 = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatecoupon = await Coupon2.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatecoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCoupon2 = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletecoupon = await Coupon2.findByIdAndDelete(id);
    res.json(deletecoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const getCoupon2 = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getAcoupon = await Coupon2.findById(id);
    res.json(getAcoupon);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  validateCoupon,
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
  getCoupon2,
};
