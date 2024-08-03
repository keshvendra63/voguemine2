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
  getMonthWiseOrderIncome1,
  getYearlyTotalOrders1,
  getAllOrders1,
  getMonthWiseOrderIncome2,
  getYearlyTotalOrders2,
  getAllOrders2,
  getSingleOrder,
  updateOrder,
  emptyCart,
  getTodaysOrderIncome,
  getWeekWiseOrderIncome,
  getYesterdayOrderIncome,
  getTodaysOrderIncome1,
  getWeekWiseOrderIncome1,
  getYesterdayOrderIncome1,
  getTodaysOrderIncome2,
  getWeekWiseOrderIncome2,
  getYesterdayOrderIncome2,
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
  fData,
  getCustomDateRangeOrderIncome1,
  fData1,
  getCustomDateRangeOrderIncome2,
  fData2,
  returnOrder,
  user200,
  deleteAbandoned
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {checkout,paymentVerification, phonePe, redirectUri, hdfcPayment, hdfcResponse, billdeskPay, billdeskRes, billPay, billRes, checkOrderStatus, hdfcStatus,phonePe200, redirectUri200,checkoutlvl, paymentVerificationlvl, checkoutvogue, paymentVerificationvogue,payuHash, payuSuccess, payuFailed, paypalToken, createPaypalOrder, paypalCapture}=require("../controller/paymentCtrl");
const sendOtp = require("../controller/otpController");
const {siteMap}=require('../controller/sitemapCtrl')
const router = express.Router();
router.post("/register", createUser);
router.post("/user200", user200);
router.post("/forgot-password-token", forgotPasswordToken);
router.get("/sendOtp/:number",sendOtp)
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/order/checkout",phonePe)
router.post("/order/codpay",phonePe200)
router.post("/order/hdfcPay",hdfcPayment)
router.post("/order/hdfcRes",hdfcResponse)
router.post("/order/hdfcStatus",hdfcStatus)
router.post("/order/billPay",billPay)
router.post("/order/billRes",billRes)
router.post("/status/:merchantTransactionId",redirectUri)
router.post("/status200/:merchantTransactionId",redirectUri200)
router.post("/payu/hash",payuHash)
router.post("/payu/success",payuSuccess)
router.post("/payu/failed",payuFailed)
router.post("/paypal/token",paypalToken)
router.post("/paypal/order",createPaypalOrder)
router.post("/paypal/order/:orderId/capture",paypalCapture)
router.post("/order/checkout1",checkoutlvl)
router.post("/order/paymentVerification1",paymentVerificationlvl)
router.post("/order/checkout2",checkoutvogue)
router.post("/order/paymentVerification2",paymentVerificationvogue)
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", createOrder);
router.post("/create-abondend", createAbondend);
router.get("/all-users", getallUser);
router.put("/cancelOrder/:orderId",authMiddleware,isAdmin,cancelOrder)
router.delete("/deleteabandoned/:id",authMiddleware,isAdmin,deleteAbandoned)
router.put("/returnOrder/:orderId",authMiddleware,isAdmin,returnOrder)
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
router.get("/getallorders1", authMiddleware, isAdmin, getAllOrders1);
router.get("/getallorders2", authMiddleware, isAdmin, getAllOrders2);

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
router.get("/getMonthWiseOrderIncome1",authMiddleware,getMonthWiseOrderIncome1)
router.get("/getYearlyTotalOrders1",authMiddleware,getYearlyTotalOrders1)
router.get("/getTodayTotalOrders1",authMiddleware,getTodaysOrderIncome1)
router.get("/getWeekTotalOrders1",authMiddleware,getWeekWiseOrderIncome1)
router.get("/getYesterdayTotalOrders1",authMiddleware,getYesterdayOrderIncome1)
router.get("/getCustomTotalOrders1",getCustomDateRangeOrderIncome1)
router.get("/graphData1",fData1)
router.get("/getMonthWiseOrderIncome2",authMiddleware,getMonthWiseOrderIncome2)
router.get("/getYearlyTotalOrders2",authMiddleware,getYearlyTotalOrders2)
router.get("/getTodayTotalOrders2",authMiddleware,getTodaysOrderIncome2)
router.get("/getWeekTotalOrders2",authMiddleware,getWeekWiseOrderIncome2)
router.get("/getYesterdayTotalOrders2",authMiddleware,getYesterdayOrderIncome2)
router.get("/getCustomTotalOrders2",getCustomDateRangeOrderIncome2)
router.get("/graphData2",fData2)
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
