const { generateToken } = require('../config/jwtToken');
var uniqid = require('uniqid'); 
const User=require('../models/userModel');
const Cart=require("../models/cartModel.js")
const Product=require("../models/productModel.js")
const Coupon =require("../models/couponModel.js")
const Order=require("../models/orderModel.js")
const asyncHandler=require("express-async-handler");
const validateMongoDbId = require('../utils/validateMongodbId');
const {generateRefreshToken} =require("../config/refreshToken")
const jwt=require("jsonwebtoken");
const crypto =require("crypto")
const sendEmail = require('./emailController');
const createUser=asyncHandler(
    async(req,res)=>{
        const email=req.body.email;
        const findUser=await User.findOne({email:email})
        if(!findUser){
            //create a new user
            const newUser=await User.create(req.body)
            res.json(newUser)
        }
        else{
            //user exist
                throw new Error("user already exist")
        }
    }
)

const loginUser=asyncHandler(
    async(req,res)=>{
        const {email,password} =req.body
        const findUser=await User.findOne({email});
        if(findUser && (await findUser.isPasswordMatched(password))){
            const refreshToken=await generateRefreshToken(findUser?._id)
            const updateuser= await User.findByIdAndUpdate(findUser.id,{
                refreshToken:refreshToken,
            },{
                new:true
            })
            res.cookie('refreshToken',refreshToken,{
                httpOnly:true,
                maxAge:72*60*60*1000,
            })
            res.json({
                _id:findUser?._id,
                name:findUser?.name,
                email:findUser?.email,
            mobile:findUser?.mobile,
            token:generateToken(findUser?._id)
 
            })
        }
        else{
            throw new Error("Invalid Credentials")
        }
    }
)


const loginAdmin=asyncHandler(
    async(req,res)=>{
        const {email,password} =req.body
        const findAdmin=await User.findOne({email});
        if(findAdmin.role !== "admin") throw new Error("Not Authorised")
        if(findAdmin && (await findAdmin.isPasswordMatched(password))){
            const refreshToken=await generateRefreshToken(findAdmin?._id)
            const updateuser= await User.findByIdAndUpdate(findAdmin.id,{
                refreshToken:refreshToken,
            },{
                new:true
            })
            res.cookie('refreshToken',refreshToken,{
                httpOnly:true,
                maxAge:72*60*60*1000,
            })
            res.json({
                _id:findAdmin?._id,
                name:findAdmin?.name,
                email:findAdmin?.email,
            mobile:findAdmin?.mobile,
            token:generateToken(findAdmin?._id)
 
            })
        }
        else{
            throw new Error("Invalid Credentials")
        }
    }
)


//get all users

const getAllUsers=asyncHandler(async(req,res)=>{
    try{
        const getUsers=await User.find()
        res.json(getUsers)
    }
    catch(error){
        throw new Error(error)
    }
    
})


const getSingleUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)

    try{
        
        const getUser= await User.findById(id)
        res.json(getUser)
    }
    catch(error){
        throw new Error(error)
    }
})

const deleteAUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)

    try{
        
        const deleteUser= await User.findByIdAndDelete(id)
        res.json(deleteUser)
    }
    catch(error){
        throw new Error(error)
    }
})


const saveAddress=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    validateMongoDbId(_id)
    try{
        const updatedUser=await User.findByIdAndUpdate(_id,{
            address: req?.body?.address,

        },
        {
            new: true
        })
        
        res.json(updatedUser)
    }
    catch(error){
        throw new Error("Unable to update the user")
    }
})
const updateUser=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    validateMongoDbId(_id)
    try{
        const updatedUser=await User.findByIdAndUpdate(_id,{
            name: req?.body?.name,
            email: req?.body?.email,
            mobile: req?.body?.mobile

        },
        {
            new: true
        })
        
        res.json(updatedUser)
    }
    catch(error){
        throw new Error("Unable to update the user")
    }
})

const blockUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)

    try{
        const block=await User.findByIdAndUpdate(id,{
            isBlocked:true,
        },
        {
            new:true
        })
        res.json({
            message:"User Blocked"
        })
    }
    catch(error){
        throw new Error(error)
    }
})
const unBlockUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)

    try{
        const unblock=await User.findByIdAndUpdate(id,{
            isBlocked:false,
        },
        {
            new:true
        })
        res.json({
            message:"User Unblocked"
        })
    }
    catch(error){
        throw new Error(error)
    }
})

const handleRefreshToken=asyncHandler(async(req,res)=>{
    const cookie=req.cookies;
    console.log(cookie)
    if(!cookie?.refreshToken) throw new Error("No refresh Token")
    const refreshToken=cookie.refreshToken;
console.log(refreshToken)
    const user = await User.findOne({refreshToken})
    if(!user) throw new Error("No refresh token found in DB or not matched")
    jwt.verify(refreshToken,process.env.JWT_SECRET,(err,decoded)=>{
        if(err || user.id !== decoded.id){
            throw new Error("There is something wrong with refresh Token")
        }
        const accessToken=generateToken(user?._id)
        res.json({accessToken})
    })
    res.json(user)
})
const logOut=asyncHandler(async(req,res)=>{
    const cookie=req.cookies;
    if(!cookie?.refreshToken) throw new Error("No refresh Token")
    const refreshToken=cookie.refreshToken;
const user=await User.findOne({refreshToken})
if(!user){
    res.clearCookie('refreshToken',{
        httpOnly:true,
        secure:true,
    })
return res.sendStatus(204)
}
await User.findOneAndUpdate({refreshToken},{
    refreshToken:""
})
res.clearCookie('refreshToken',{
    httpOnly:true,
    secure:true,
})
return res.sendStatus(204)


})



const updatePassword=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    const {password}=req.body;
    validateMongoDbId(_id)
    const user=await User.findById(_id);
    if(password){
        user.password=password;
        const updatedPassword=await user.save();
        res.json(updatedPassword)
    }
    else{
        res.json(user)
    }
})

const forgotPasswordToken=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const user=await User.findOne({email});
    if(!user) throw new Error("User not Found with this email")
    try{
const token=await user.createPasswordResetToken();
await user.save();
const resetUrl=`Hii Please Follow this link to reset you password, this link is valid till 10 minutes from now. <a href="http://localhost:5000/api/user/reset-password/${token}">Click Here</a>`;
const data={
    to:email,
    text:"Hey User",
    subject:"Forgot Password Link",
    htm:resetUrl,
}
sendEmail(data);
res.json(token)

}
catch(error){
    throw new Error(error)
}
})


const resetPassword=asyncHandler(async(req,res)=>{
    const {password} =req.body;
    const {token}=req.params;
    const hashedToken=crypto.createHash("sha256").update(token).digest("hex");
    const user=await User.findOne({
        passwordResetToken:hashedToken,
        passwordResetExpires:{$gt: Date.now()},
    })
    if(!user) throw new Error("Token Expired please try again later")
    user.password=password;
user.passwordResetToken=undefined;
user.passwordResetExpires=undefined;
await user.save();
res.json(user)
})

const userCart=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    const {cart}=req.body;
    validateMongoDbId(_id)
    try{
        let products=[]
        const user=await User.findById(_id);

        const alreadyExistCart=await Cart.findOne({orderby:user._id})
        if(alreadyExistCart){
            alreadyExistCart.remove();
        }
        for(let i=0;i<cart.length;i++){
            let object={};
            object.product=cart[i]._id
            object.count=cart[i].count
            object.color=cart[i].color
            let getPrice=await Product.findById(cart[i]._id).select("price").exec();
            object.price=getPrice.price;
            products.push(object)
        }
        let cartTotal=0;
        for(let i=0;i<products.length;i++){
            cartTotal=cartTotal+products[i].price*products[i].count;
        }
        let newCart=await new Cart({
            products,
            cartTotal,orderby:user?._id,
        }).save()
        res.json(newCart)
    }
    catch(error){
        throw new Error(error)
    }
})

const getUserCart=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    validateMongoDbId(_id)
    try{
        const cart=await Cart.findOne({orderby:_id}).populate(
            "products.product"
        )
        res.json(cart);
    }
    catch(error){
        throw new Error(error)
    }
})

const emptyCart=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    validateMongoDbId(_id)
    try{
        const user=await User.findOne({_id});
        const cart=await Cart.findOneAndDelete({orderby:user._id})
        res.json(cart)
    }
    catch(error){
        throw new Error(error)
    }
})

const getWishlist=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    try{
        const findUser=await User.findById(_id).populate("wishlist")
        res.json(findUser)
    }
    catch(error){
        throw new Error(error)
    }
})

const applyCoupon=asyncHandler(async(req,res)=>{
    const {coupon}=req.body;
    const {_id}=req.user
    const validCoupon=await Coupon.findOne({name:coupon})
    if(validCoupon=== null){
        throw new Error("Invalid Coupon")
    }
    const user=await User.findOne({_id})
    let {cartTotal}=await Cart.findOne({orderby:user._id}).populate("products.product")
    let totalAfterDiscount=(cartTotal-(cartTotal*validCoupon.discount)/100).toFixed(2)
    await Cart.findOneAndUpdate({orderby:user._id},{totalAfterDiscount},{new:true})
    res.json(totalAfterDiscount)
})


const createOrder=asyncHandler(async(req,res)=>{
    const {COD,couponApplied}=req.body;
    const {_id}=req.user;
    validateMongoDbId(_id);
    try{
        if(!COD) throw new Error("Create COD order failed")
        const user=await User.findById(_id);
    let userCart=await Cart.findOne({orderby:user._id})
    let finalAmount=0
    if(couponApplied && userCart.totalAfterDiscount){
        finalAmount=userCart.totalAfterDiscount
    }
    else{
        finalAmount=userCart.cartTotal
    }
    let newOrder=await new Order({
        products:userCart.products,
        paymentIntent:{
            id:uniqid(),
            method:"COD",
            amount:finalAmount,
            status:"Cash on Delivery",
            created:Date.now(),
            currency:"inr"
        },
        orderby:user._id,
        orderStatus:"Cash on Delivery",

    }).save();
    let update=userCart.products.map((item)=>{
        return {
            updateOne:{
                filter:{_id:item.product._id},
                update:{$inc:{quantity:-item.count,sold:+item.count}},
            },
        }
    })
    const updated=await Product.bulkWrite(update,{})
    res.json({message:"success"})

    }
    catch(error){
        throw new Error(error)
    }
})


const getOrders=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    validateMongoDbId(_id)
    try{
        const userorders=await Order.findOne({orderby:_id}).populate('products.product').exec()
        res.json(userorders)
    }
    catch(error){
        throw new Error(error)
    }
})


const updateOrderStatus=asyncHandler(async(req,res)=>{
    const {status}=req.body;
    const {id}=req.params;
    validateMongoDbId(id)
try{
    const updateOrderStatus=await Order.findByIdAndUpdate(id,{
        orderStatus:status,
        paymentIntent:{
            status:status
        }
    },{
        new:true
    })
    res.json(updateOrderStatus)
}
catch(error){
    throw new Error(error)
}
})

module.exports={applyCoupon,saveAddress,getWishlist,resetPassword,forgotPasswordToken,updatePassword,logOut,createUser,loginUser,getAllUsers,getSingleUser,deleteAUser,updateUser,blockUser,unBlockUser,handleRefreshToken,loginAdmin,userCart,getUserCart,emptyCart,createOrder,getOrders,updateOrderStatus}