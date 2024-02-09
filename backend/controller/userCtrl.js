const { generateToken } = require('../config/jwtToken');
const User=require('../models/userModel');
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
module.exports={resetPassword,forgotPasswordToken,updatePassword,logOut,createUser,loginUser,getAllUsers,getSingleUser,deleteAUser,updateUser,blockUser,unBlockUser,handleRefreshToken}