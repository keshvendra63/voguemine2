const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const ChicOrder = require("../models/chicOrder");
const axios=require('axios')
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



const createChicOrder=asyncHandler(async(req,res)=>{
  const { shippingInfo, orderItems, totalPrice, finalAmount, shippingCost, orderType, discount, orderId, tag,orderNumber } = req.body;

    try {
        // Check inventory before creating the order
        for (const orderItem of orderItems) {
          const { product, color, size, quantity } = orderItem;
          const productId = product._id;
    
          // Find the product in the database
          const foundProduct = await Product.findById(productId);
    
          if (!foundProduct) {
            throw new Error(`Product with ID ${productId} not found`);
          }
    
          // Find the variant matching the color and size
          const variant = foundProduct.variants.find(
            (variant) => variant.color === color && variant.size === size
          );
    
          if (!variant) {
            throw new Error(`Variant not found for ${color} - ${size}`);
          }
    
          // Check if there is enough quantity available
          if (variant.quantity < quantity) {
            throw new Error(`Not enough quantity available for ${color} - ${size}`);
          }
        }
    
        // If inventory is sufficient, create the order
        const order = await ChicOrder.create({
          orderNumber,
          shippingInfo,
          orderItems,
          totalPrice,
          finalAmount,
          shippingCost,
          orderType,
          discount,
          orderId,
          tag
        });
    
        // Send additional notifications
        const phoneNumbers = ['9811363760','9873782103'];
        for (const phoneNumber of phoneNumbers) {
          await axios.post('https://api.delightchat.io/api/v1/public/message', {
            country_code: '+91',
            phone_number: phoneNumber,
            automation_id: 'd9725206-5614-4944-8d7f-a50c6634cb1f',
            message_data: {
              1: `${order.orderNumber}`,
              2: `${finalAmount}`,
              3: `${orderType}`,
              4: `${orderItems.length}`
            }
          }, {
            headers: {
              'X-API-KEY': 'hJLHJuNA1Wn0GK0VozG0AsfFQ1M7FizrVRWfGdkcMEvR7j6s1bPgO1Db8e9Y91rUbAxduAbFiFLvAony',
              'Content-Type': 'application/json'
            }
          });
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
    
        // Update the inventory
        await processOrder(orderItems);
    
        res.json({
          order,
          success: true
        });
      } catch (error) {
        console.error("Error creating order:", error.message);
        res.status(400).json({ message: error.message });
      }
})



const getAllOrders = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 50; // Number of items per page
  const page = parseInt(req.query.page) || 1; // Current page, default is 1

  try {
    let query = {};

    // Check if search query is provided
    if (req.query.search) {
      const searchKeyword = req.query.search.toLowerCase().trim();
      const regexPattern = new RegExp(`^${searchKeyword}$`, 'i');
    
      query.$or = [
        { orderNumber: { $regex: searchKeyword, $options: 'i' } },
        { 'shippingInfo.firstname': searchKeyword },
        { 'shippingInfo.email': searchKeyword },
        { 'shippingInfo.phone': parseInt(searchKeyword) || null }
        // Add more fields here for flexible searching
        // Example: { 'fieldName': { $regex: new RegExp(searchKeyword, 'i') } }
      ];
    }

    const count = await ChicOrder.countDocuments(query); // Total number of matching orders

    // Calculate the skipping value based on the current page
    const skip = Math.max(0, (count - (page * limit)));

    // Query orders with pagination and search criteria
    const orders = await ChicOrder.find(query)
      .populate("orderItems.product")
      .skip(skip)
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
    const orders=await ChicOrder.findOne({_id:id}).populate("orderItems.product")
    res.json({
      orders
    })
  }
  catch(error){
    throw new Error(error)
  }
})


module.exports={createChicOrder,getAllOrders,getSingleOrder}