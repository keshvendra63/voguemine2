const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  createOrder,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMyOrders,
  getMonthWiseOrderIncome,
  getYearlyTotalOrders,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  emptyCart,
  getTodaysOrderIncome,
  getWeekWiseOrderIncome,
  getYesterdayOrderIncome,
  orderComment,
  orderHistory,
  createAbondend,
  getAllAbandoned,
  getSingleAbandoned,
  getOldOrders,
  getHistory,
  createHistory,
  updateAbandoned,
  cancelOrder,
  retrieveOrder,
  changeOrderTypeToPrepaid,
  changeOrderTypeToCOD,
  sendTracking,
  sendDelivery,
  getCustomDateRangeOrderIncome,
  fData
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {checkout,paymentVerification, phonePe, redirectUri, hdfcPayment, hdfcResponse}=require("../controller/paymentCtrl");
const sendOtp = require("../controller/otpController");
const {siteMap}=require('../controller/sitemapCtrl')
const router = express.Router();
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.get("/sendOtp/:number",sendOtp)
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/order/checkout",phonePe)
router.post("/order/hdfcPay",hdfcPayment)
router.post("/order/hdfcRes",hdfcResponse)

router.post("/status/:merchantTransactionId",redirectUri)
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", createOrder);
router.post("/create-abondend", createAbondend);
router.get("/all-users", getallUser);
router.put("/cancelOrder/:orderId",authMiddleware,isAdmin,cancelOrder)
router.post("/sendTracking",sendTracking)
router.post("/sendDelivery",sendDelivery)
router.put("/retrieveOrder/:orderId",authMiddleware,isAdmin,retrieveOrder)
router.put("/prepaidOrder/:orderId",authMiddleware,isAdmin,changeOrderTypeToPrepaid)
router.put("/codOrder/:orderId",authMiddleware,isAdmin,changeOrderTypeToCOD)
router.get("/gethistory",authMiddleware,isAdmin,getHistory)
router.post("/createhistory",authMiddleware,isAdmin,createHistory)
router.get("/getmyorders", authMiddleware, getMyOrders);
router.get("/getoldorders", authMiddleware,isAdmin, getOldOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/getaOrder/:id", authMiddleware, isAdmin, getSingleOrder);
router.get("/getallabandoned", authMiddleware, isAdmin, getAllAbandoned);
router.get("/getaAbandoned/:id", authMiddleware, isAdmin, getSingleAbandoned);
router.put("/updateOrder/:id",authMiddleware,isAdmin,updateOrder)
router.put("/updateAbandoned/:id",authMiddleware,isAdmin,updateAbandoned)
router.put("/message",authMiddleware,isAdmin, orderComment);
router.put("/history",authMiddleware,isAdmin, orderHistory);

// router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getAllOrders);
router.get("/getMonthWiseOrderIncome",authMiddleware,getMonthWiseOrderIncome)
router.get("/getYearlyTotalOrders",authMiddleware,getYearlyTotalOrders)
router.get("/getTodayTotalOrders",authMiddleware,getTodaysOrderIncome)
router.get("/getWeekTotalOrders",authMiddleware,getWeekWiseOrderIncome)
router.get("/getYesterdayTotalOrders",authMiddleware,getYesterdayOrderIncome)
router.get("/getCustomTotalOrders",getCustomDateRangeOrderIncome)
router.get("/graphData",fData)

router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.get("/sitemap.xml",siteMap)
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/empty-cart", authMiddleware,emptyCart);
router.delete("/delete-product-cart/:cartItemId", authMiddleware, removeProductFromCart);
router.delete("/update-product-cart/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityFromCart);

router.delete("/:id", deleteaUser);
// router.put(
//   "/order/update-order/:id",
//   authMiddleware,
//   isAdmin,
//   updateOrderStatus
// );
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
