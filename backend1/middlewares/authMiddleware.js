const User=require('../models/userModel')

const jwt=require("jsonwebtoken")
const asyncHandler=require("express-async-handler")

const authMiddleware=asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token=req.headers.authorization.split(' ')[1];
        try{
            if(token){
                const decoded=jwt.verify(token,process.env.JWT_SECRET)
                const user=await User.findById(decoded?.id);
                req.user=user;
                next()
            }
        }
        catch(error){
            throw new Error("not authorized token expires please login again")
        }
    }
    else{
        throw new Error("there is no token attached")
    }
})

const isAdmin = async (req, res, next) => {
    try {
        if (req.user && req.user.role === 'admin') {
            // User is an admin, allow access
            next();
        } else {
            // User is not an admin, deny access
            throw new Error('You are not authorized to access this resource');
        }
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

module.exports = isAdmin;

module.exports={authMiddleware,isAdmin}