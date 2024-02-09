const BlogCategory=require("../models/blogCatModel")
const validateMongoDbId=require("../utils/validateMongodbId")
const asyncHandler=require("express-async-handler")

const createBlogCategory=asyncHandler(async(req,res)=>{
    try{
        const newBlogCategory=await BlogCategory.create(req.body);
        res.json(newBlogCategory)
    }catch(error){
        throw new Error(error)
    }
})
const updateBlogCategory=asyncHandler(async(req,res)=>{
    const {id} =req.params;
    validateMongoDbId(id)

    try{
        const updateBlogCategory=await BlogCategory.findByIdAndUpdate(id,
            req.body
        ,{new:true})
        res.json(updateBlogCategory)
    }
    catch(error){
        throw new Error(error)
    }
})

const deleteBlogCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)

    try{
        
        const deleteBlogCategory= await BlogCategory.findByIdAndDelete(id)
        res.json(deleteBlogCategory)
    }
    catch(error){
        throw new Error(error)
    }
})
const getSingleBlogCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)

    try{
        
        const getBlogCategory=await BlogCategory.findById(id)
        res.json(getBlogCategory)
    }
    catch(error){
        throw new Error(error)
    }
})

const getAllBlogCategories=asyncHandler(async(req,res)=>{
    try{
        const getBlogCategories=await BlogCategory.find()
        res.json(getBlogCategories)
    }
    catch(error){
        throw new Error(error)
    }
    
})


module.exports={createBlogCategory,updateBlogCategory,deleteBlogCategory,getAllBlogCategories,getSingleBlogCategory}