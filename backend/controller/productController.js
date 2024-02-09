const Product=require("../models/productModel")
const asyncHandler=require("express-async-handler")
const User=require("../models/userModel")
const slugify=require("slugify")
const validateMongoDbId = require('../utils/validateMongodbId');
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs=require("fs")
const createProduct=asyncHandler(async(req,res)=>{
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title)
        }
        const newProduct=await Product.create(req.body)
        res.json(newProduct)
    }catch(error){
        throw new Error(error)
    }
    res.json({
        message:"Hey this is product route"
    })
})
const updateProduct=asyncHandler(async(req,res)=>{
    const {id} =req.params;
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title)
        }
        const updatePrdt=await Product.findByIdAndUpdate(id,
            req.body
        ,{new:true})
        res.json(updatePrdt)
    }
    catch(error){
        throw new Error(error)
    }
})

const getSingleProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
        
        const getProduct= await Product.findById(id)
        res.json(getProduct)
    }
    catch(error){
        throw new Error(error)
    }
})

const getAllProducts=asyncHandler(async(req,res)=>{
    try{
        // filtering
        const queryObj={...req.query};
        const excludeFields=['page','sort','limit','fields']
        excludeFields.forEach((el)=>delete queryObj[el])
        let queryStr=JSON.stringify(queryObj);
        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=> `$${match}`)
        let query=Product.find(JSON.parse(queryStr))

//sorting
if(req.query.sory){
    const sortBy=req.query.sort.split(",").join(" ");
    query=query.sort(sortBy)
}
else{
    query=query.sort("-createdAt")
}

//limiting the fields

if(req.query.fields){
    const fields=req.query.fields.split(",").join(" ");
    query=query.select(fields)
}
else{
    query=query.select('-__v')

}

//pagination


const page=req.query.page;
const limit=req.query.limit;
const skip=(page - 1)* limit;
query=query.skip(skip).limit(limit)
if(req.query.page){
    const productCount=await Product.countDocuments();
    if(skip>=productCount) throw new Error("This page does not exists")
}

        const product = await query;
        res.json(product)
    }
    catch(error){
        throw new Error(error)
    }
    
})

const deleteAProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;

    try{
        
        const deleteProduct= await Product.findByIdAndDelete(id)
        res.json(deleteProduct)
    }
    catch(error){
        throw new Error(error)
    }
})

const addToWishlist=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    const {prodId}=req.body;
    try{
        const user=await User.findById(_id)
        const alreadyAdded=user.wishlist.find((id)=> id.toString()=== prodId)
        if(alreadyAdded){
            let user=await User.findByIdAndUpdate(_id,{
                $pull:{wishlist:prodId},
            },{
                new:true
            }
            )
            res.json(user)
        }
        else{
            let user=await User.findByIdAndUpdate(_id,{
                $push:{wishlist:prodId},
            },{
                new:true
            }
            )
            res.json(user)
        }

    }catch(error){
        throw new Error(error)
    }
})

const rating=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    const {star,prodId,comment}=req.body;
    
    try{
        const product=await Product.findById(prodId)
        const alreadyRated=product.ratings.find((userId)=> userId.postedby.toString()=== _id.toString())
        if(alreadyRated){
            const updaterating=await Product.updateOne({
                ratings:{ $elemMatch:alreadyRated}
                
            },{
                $set:{"ratings.$.star":star,"ratings.$.comment":comment},
            },{
                new:true
            }
            )
            res.json(updaterating)
        }
        else{
            const rateProduct=await Product.findByIdAndUpdate(
                prodId,{
                    $push:{
                        ratings:{
                            star:star,
                            comment:comment,
                            postedby:_id,
                        }
                    }
                },{
                    new:true
                }
            )
            res.json(rateProduct)
        }
        const getallratings=await Product.findById(prodId)
        let totalRating=getallratings.ratings.length;
        let ratingsum=getallratings.ratings.map((item)=>item.star).reduce((prev,curr)=>prev+curr,0)
        let actualRating=Math.round(ratingsum/totalRating)
        let finalproduct=await Product.findByIdAndUpdate(prodId,{
            totalratings:actualRating
        },{
            new:true
        }) 
        res.json(finalproduct)
    }catch(error){
        throw new Error(error)
    }

})

const uploadImages=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)
    try{
        const uploader=(path)=>cloudinaryUploadImg(path,"images");
        const urls=[]
        const files=req.files;
        for (const file of files){
            const {path}=file;
            const newpath=await uploader(path);
            urls.push(newpath)
            fs.unlinkSync(path)


        }
        const findProduct=await Product.findByIdAndUpdate(
            id,
            {
                images:urls.map((file)=>{
                    return file;
                })
            },{
                new:true
            }
        )
        res.json(findProduct)
    }
    catch(error){
        throw new Error(error)
    }
})



module.exports={uploadImages,rating,createProduct,getSingleProduct,getAllProducts,updateProduct,deleteAProduct,addToWishlist}