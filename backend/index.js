const express =require("express");
const dbConnect = require("./config/dbConnect");
const app =express();
const dotenv=require("dotenv").config();
const PORT= process.env.PORT || 4000;
const authRouter=require('./routes/authRoute');
const productRouter=require("./routes/productRoute")
const blogRouter=require("./routes/blogRoutes")
const productCategoryRouter=require("./routes/productCategoryRoutes")
const blogCategoryRouter=require("./routes/blogCatRoutes")
const brandRouter=require("./routes/brandRoute")
const couponRoute=require("./routes/couponRoute")
const bodyParser = require("body-parser");
const cookieParser=require("cookie-parser")
const morgan=require("morgan")
const cors =require("cors")
const { notFound, errorHandler } = require("./middleware/errorhandler");
dbConnect()
app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())


app.use("/api/user",authRouter)
app.use("/api/product",productRouter)
app.use("/api/blog",blogRouter)
app.use("/api/productCategory",productCategoryRouter)
app.use("/api/blogCategory",blogCategoryRouter)
app.use("/api/brand",brandRouter)
app.use("/api/coupon",couponRoute)
app.use(notFound)
app.use(errorHandler)



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})