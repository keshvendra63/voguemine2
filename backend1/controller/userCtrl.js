const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const Abondend=require("../models/abondendModel")
const History =require("../models/historyModel")
const uniqid = require("uniqid");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailCtrl");
const Oldorder = require("../models/oldOrderModel");
const axios=require("axios")
// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
  /**
   * TODO:Get the email from req.body
   */
  const email = req.body.email;
  /**
   * TODO:With the help of email find the user exists or not
   */
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    /**
     * TODO:if user not found user create a new user
     */
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    /**
     * TODO:if user found then thow an error: User already exists
     */
    throw new Error("User Already Exists");
  }
});

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// admin login

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// logout functionality

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// Update a user

const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// save user Address

const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all users

const getallUser = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 50; // Number of items per page
  const page = parseInt(req.query.page) || 1; // Current page, default is 1

  try {
    const count = await User.countDocuments(); // Total number of orders

    // Calculate the skipping value based on the current page
    const skip = count - (page * limit);

    // Query orders with reverse pagination
    const user = await User.find()
      .skip(Math.max(skip, 0)) // Ensure skip is non-negative
      .limit(limit);

    res.json({
      user,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalUser: count
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Server Error" });
}})

// Get a single user

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const {productId,color,price,quantity,size } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    
    let newCart = await new Cart({
      userId:_id,
      productId,
      color,
      price,
      quantity,
      size
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});



const orderComment = asyncHandler(async (req, res) => {
  try {
      const { name, message, time,orderId } = req.body;

      // Update product with new rating and comment
      const messageOrder = await Order.findByIdAndUpdate(
          orderId,
          {
              $push: {
                  orderComment: {
                      name: name,
                      message: message,
                      time: time,
                      orderId: orderId,
                  },
              },
          },
          { new: true }
      );

      // Calculate new average rating for the product

      // Update product with new average rating
      const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { new: true }
      );

      res.json(updatedOrder);
  } catch (error) {
      console.error("Error while updating comment:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});
const orderHistory = asyncHandler(async (req, res) => {
  try {
      const { name, message, time,orderId } = req.body;

      // Update product with new rating and comment
      const messageOrder = await Order.findByIdAndUpdate(
          orderId,
          {
              $push: {
                  orderHistory: {
                      name: name,
                      message: message,
                      time: time,
                      orderId: orderId,
                  },
              },
          },
          { new: true }
      );

      // Calculate new average rating for the product

      // Update product with new average rating
      const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { new: true }
      );

      res.json(updatedOrder);
  } catch (error) {
      console.error("Error while updating comment:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.find({ userId: _id }).populate(
      "productId"
    ).populate("color");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const removeProductFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const {cartItemId} =req.params
  validateMongoDbId(_id);
  try {
    const deleteProductFromCart = await Cart.deleteOne({ userId: _id,_id:cartItemId })
    res.json(deleteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }
});
const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id)
  try {
    const deleteCart = await Cart.deleteMany({ userId: _id})
    res.json(deleteCart);
  } catch (error) {
    throw new Error(error);
  }
});
const updateProductQuantityFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const {cartItemId,newQuantity} =req.params
  validateMongoDbId(_id);
  try {
    const cartItem = await Cart.findOne({ userId: _id,_id:cartItemId })
    cartItem.quantity=newQuantity
    cartItem.save()
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});
const createHistory = asyncHandler(async (req, res) => {
  try {
    const newHistory = await History.create(req.body);
    res.json(newHistory);
  } catch (error) {
    throw new Error(error);
  }
});
const getHistory = asyncHandler(async(req, res) =>{
  const limit = parseInt(req.query.limit) || 50; // Number of items per page
  const page = parseInt(req.query.page) || 1; // Current page, default is 1

  try {
    const count = await History.countDocuments(); // Total number of orders

    // Calculate the skipping value based on the current page
    const skip = count - (page * limit);

    // Query orders with reverse pagination
    const history = await History.find()
      .skip(Math.max(skip, 0)) // Ensure skip is non-negative
      .limit(limit);

    res.json({
      history,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalHistory: count
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const processOrder = async (orderItems) => {
  try {
    // Iterate through each order item
    for (const orderItem of orderItems) {
      const { product, color, size, quantity } = orderItem;
      const productId = product._id;

      // Find the product in the database
      const foundProduct = await Product.findById(productId);

      // Find the variant matching the color and size
      const variant = foundProduct.variants.find(
        (variant) => variant.color === color && variant.size === size
      );

      if (variant) {
        // Check if there is enough quantity available
        if (variant.quantity >= quantity) {
          // Subtract the ordered quantity from the variant's quantity
          variant.quantity -= quantity;
          foundProduct.sold += quantity;
          await foundProduct.save();
        } else {
          throw new Error(`Not enough quantity available for ${color} - ${size}`);
        }
      } else {
        throw new Error(`Variant not found for ${color} - ${size}`);
      }
    }
    console.log("Inventory updated successfully");
  } catch (error) {
    console.error("Error updating inventory:", error.message);
  }
};


const createOrder=asyncHandler(async(req,res)=>{
  const {shippingInfo,orderItems,totalPrice,finalAmount,shippingCost,orderType,discount,paymentInfo,tag}=req.body;
  try{

    const order=await Order.create({
      shippingInfo,orderItems,totalPrice,finalAmount,shippingCost,orderType,discount,paymentInfo,tag
    })
    if (orderType === 'COD') {
      const orderItemsString = orderItems.map((item) => {
        return `Name: ${item.product.title}, Color: ${item.color || ""}, Size: ${item.size || ""}`;
      }).join('\n');
      // Send confirmation message using DelightChat API
      const delightChatResponse = await axios.post('https://api.delightchat.io/api/v1/public/message', {
        country_code: '+91', // Update the country code if necessary
        phone_number:`${shippingInfo?.phone}`, // Update with the phone number to send the confirmation to
        automation_id: '98f4a7a2-9ee8-4f1b-a463-2052bd7d3d24', // Update with your DelightChat automation ID
        message_data: {
          // Add any data you want to include in the message
          1: `${shippingInfo.firstname}`,
          2: `Voguemine`,
          3: `${order.orderNumber}`,
          4: `${finalAmount}`,
          5:orderItemsString,
          6: `${shippingInfo.address}`,

          // Add more data as needed
        }
      }, {
        headers: {
          'X-API-KEY': 'hJLHJuNA1Wn0GK0VozG0AsfFQ1M7FizrVRWfGdkcMEvR7j6s1bPgO1Db8e9Y91rUbAxduAbFiFLvAony', // Update with your DelightChat API key
          'Content-Type': 'application/json'
        }
      });

      // Handle DelightChat response if necessary
    }
    const { firstname, lastname, email, mobile, address } = shippingInfo;

    // Check if the user already exists
    let user = await User.findOne({ email });

    // If the user doesn't exist, create a new user
    if (!user) {
      user = await User.create({
        email,
        firstname,
        lastname,
        mobile,
        address
      });
    }
    await processOrder(orderItems);

    res.json({
      order,
      success:true
    })  
  }
  catch(error){
    throw new Error(error)
  }
})
const createAbondend = asyncHandler(async (req, res) => {
  const { shippingInfo, orderItems, totalPrice, finalAmount, shippingCost, orderType, discount, tag } = req.body;

  try {
    // Check if orderItems length is greater than 0 and shippingInfo.firstname and shippingInfo.phone are not empty
    if (orderItems.length > 0 && shippingInfo.firstname !== "" && shippingInfo.phone !== "") {
      const abandoned = await Abondend.create({
        shippingInfo,
        orderItems,
        totalPrice,
        finalAmount,
        shippingCost,
        orderType,
        discount,
        tag
      });
      
      res.json({
        abandoned,
        success: true
      });
    } else {
      // If conditions are not met, do not create abandoned and send an error response
      res.status(400).json({
        success: false,
        message: "Order items must have length greater than 0 and shipping info's firstname and phone must not be empty."
      });
    }
  } catch (error) {
    // Handle any errors
    throw new Error(error);
  }
})

const getMyOrders=asyncHandler(async(req,res)=>{
  const {_id}=req.user
  try{
    const orders=await Order.find({user:_id}).populate("user").populate("orderItems.product").populate("orderItems.color")
    res.json({
      orders
    })
  }
  catch(error){
    throw new Error(error)
  }
})
const getOldOrders=asyncHandler(async(req,res)=>{
  try{
    const orders=await Oldorder.find()
    res.json({
      orders
    })
  }
  catch(error){
    throw new Error(error)
  }
})



const getAllAbandoned = asyncHandler(async (req, res) => {
  const limit = 50; // Number of items per page
  const page = parseInt(req.query.page) || 1; // Current page, default is 1

  try {
    const count = await Abondend.countDocuments(); // Total number of orders

    // Calculate the skipping value based on the current page
    const skip = count - (page * limit);

    // Query orders with reverse pagination
    const abondend = await Abondend.find()
      .populate("orderItems.product")
      .skip(Math.max(skip, 0)) // Ensure skip is non-negative
      .limit(limit);

    res.json({
      abondend,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalOrders: count
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
const getSingleAbandoned=asyncHandler(async(req,res)=>{
  const {id}=req.params
  try{
    const abondend=await Abondend.findOne({_id:id}).populate("orderItems.product")
    res.json({
      abondend
    })
  }
  catch(error){
    throw new Error(error)
  }
})


const getAllOrders = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 50; // Number of items per page
  const page = parseInt(req.query.page) || 1; // Current page, default is 1

  try {
    const count = await Order.countDocuments(); // Total number of orders

    // Calculate the skipping value based on the current page
    const skip = count - (page * limit);

    // Query orders with reverse pagination
    const orders = await Order.find()
      .populate("user")
      .populate("orderItems.product")
      .skip(Math.max(skip, 0)) // Ensure skip is non-negative
      .limit(limit);

    res.json({
      orders,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalOrders: count
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
const getSingleOrder=asyncHandler(async(req,res)=>{
  const {id}=req.params
  try{
    const orders=await Order.findOne({_id:id}).populate("user").populate("orderItems.product")
    res.json({
      orders
    })
  }
  catch(error){
    throw new Error(error)
  }
})
const updateOrder=asyncHandler(async(req,res)=>{
  const { id } = req.params;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedOrder);
  } catch (error) {
    throw new Error(error);
  }
})
const updateAbandoned=asyncHandler(async(req,res)=>{
  const { id } = req.params;
  try {
    const updatedAbandoned = await Abondend.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedAbandoned);
  } catch (error) {
    throw new Error(error);
  }
})
const getMonthWiseOrderIncome=asyncHandler(async(req,res)=>{
  const monthNames=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

  let d=new Date();
  let endDate="";
  d.setDate(1)
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth()-1)
    endDate=monthNames[d.getMonth()]+" "+d.getFullYear()
    
    
  }
  const data=await Order.aggregate([
    {
      $match:{
        createdAt:{
          $lte:new Date(),
          $gte:new Date(endDate)
        },
        orderType: { $ne: "Cancelled" } // Exclude orders with the "Cancelled" tag

      }
    },{
      $group: {
        _id: {
          month: "$month"
        },
        amount: { $sum: "$finalAmount" },
        count: { $sum: 1 },
        items: { $push: "$orderItems" } // Accumulate all items in orders
      }
    },
    {
      $project: {
        _id: 1,
        amount: 1,
        count: 1,
        items: 1,
        orderItemCount: { $sum: { $size: "$items" } } // Get the count of orderItems
      }
    }
  ])
  res.json(data)
})


const getYearlyTotalOrders=asyncHandler(async(req,res)=>{
  const monthNames=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

  let d=new Date();
  let endDate="";
  d.setDate(1)
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth()-1)
    endDate=monthNames[d.getMonth()]+" "+d.getFullYear()
    
  }
  const data=await Order.aggregate([
    {
      $match:{
        createdAt:{
          $lte:new Date(),
          $gte:new Date(endDate)
        },
        orderType: { $ne: "Cancelled" } // Exclude orders with the "Cancelled" tag

      }
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        amount: { $sum: "$finalAmount" },
        items: { $push: "$orderItems" } // Accumulate all items in orders
      }
    },
    {
      $project: {
        _id: 1,
        amount: 1,
        count: 1,
        items: 1,
        orderItemCount: { $sum: { $size: "$items" } } // Get the count of orderItems
      }
    }
  ])
  res.json(data)
})
const getTodaysOrderIncome = asyncHandler(async (req, res) => {
  // Get current date in Indian Standard Time (IST)
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const startOfDay = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 18, 30, 0); // Start of yesterday
// Set time to 11:59:59.999 PM IST
const startOfDayIST = new Date(today);
  startOfDayIST.setHours(18, 29, 59, 999)
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfDay,
          $lte: startOfDayIST
        },
        orderType: { $ne: "Cancelled" } // Exclude orders with the "Cancelled" tag


      }
    },
    {
      $group: {
        _id: null,
        totalIncome: { $sum: "$finalAmount" },
        totalCount: { $sum: 1 },
        items: { $push: "$orderItems" }
      }
    },
    {
      $project: {
        _id: 1,
        totalIncome: 1,
        totalCount: 1,
        items: 1,
        orderItemCount: { $sum: { $size: "$items" } }
      }
    }
  ]);

  res.json(data);
});

const getWeekWiseOrderIncome = asyncHandler(async (req, res) => {
  // Get the start and end dates for the current week
  const today = new Date();
  const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()); // Start of the week (Sunday)
  const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay())); // End of the week (Saturday)

  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfWeek,
          $lte: endOfWeek
        },
        orderType: { $ne: "Cancelled" } // Exclude orders with the "Cancelled" tag
      }
    },
    {
      $group: {
        _id: null,
        totalIncome: { $sum: "$finalAmount" },
        totalCount: { $sum: 1 },
        items: { $push: "$orderItems" } // Accumulate all items in orders
      }
    },
    {
      $project: {
        _id: 1,
        totalIncome: 1,
        totalCount: 1,
        items: 1,
        orderItemCount: { $sum: { $size: "$items" } } // Get the count of orderItems
      }
    }
  ]);

  res.json(data);
});


const getYesterdayOrderIncome = asyncHandler(async (req, res) => {
  // Get yesterday's date
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 2);
  today.setDate(today.getDate() - 1);
  const startOfDayIST = new Date(today);
  startOfDayIST.setHours(18, 29, 59, 999)
  const startOfDay = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 18, 30, 0); // Start of yesterday
  // const endOfDay = new Date(today.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59); // End of yesterday
console.log(startOfDay,startOfDayIST)
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfDay,
          $lte: startOfDayIST
        },
        orderType: { $ne: "Cancelled" } // Exclude orders with the "Cancelled" tag

      }
    },
    {
      $group: {
        _id: null,
        totalIncome: { $sum: "$finalAmount" },
        totalCount: { $sum: 1 },
        items: { $push: "$orderItems" } // Accumulate all items in orders
      }
    },
    {
      $project: {
        _id: 1,
        totalIncome: 1,
        totalCount: 1,
        items: 1,
        orderItemCount: { $sum: { $size: "$items" } } // Get the count of orderItems
      }
    }
  ]);

  res.json(data);
});



module.exports = {
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
  createHistory,
  getHistory,
  updateAbandoned
};
