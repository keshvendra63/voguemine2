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
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {checkout,paymentVerification}=require("../controller/paymentCtrl")
const router = express.Router();
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);

router.put("/reset-password/:token", resetPassword);
router.put("/message", rating);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/order/checkout",authMiddleware,checkout)
router.post("/order/paymentVerification",authMiddleware,paymentVerification)
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", createOrder);
router.get("/all-users", getallUser);
router.get("/getmyorders", authMiddleware, getMyOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/getaOrder/:id", authMiddleware, isAdmin, getSingleOrder);
router.put("/updateOrder/:id",authMiddleware,isAdmin,updateOrder)
router.put("/order/message",authMiddleware,isAdmin, orderComment);

// router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getAllOrders);
router.get("/getMonthWiseOrderIncome",authMiddleware,getMonthWiseOrderIncome)
router.get("/getYearlyTotalOrders",authMiddleware,getYearlyTotalOrders)
router.get("/getTodayTotalOrders",authMiddleware,getTodaysOrderIncome)
router.get("/getWeekTotalOrders",authMiddleware,getWeekWiseOrderIncome)
router.get("/getYesterdayTotalOrders",authMiddleware,getYesterdayOrderIncome)

router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);

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
