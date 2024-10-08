const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT =5000;
const authRouter = require("./routes/authRoute");
const chicRouter=require("./routes/chicRoute")
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const blogcategoryRouter = require("./routes/blogCatRoute");
const collectionRouter = require("./routes/collectionRoute");
const bannerRouter=require("./routes/bannerRoutes")
const enqRouter = require("./routes/enqRoute");
const couponRouter = require("./routes/couponRoute");
const uploadRouter = require("./routes/uploadRoute");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use("/api/user", authRouter);
app.use("/api/chicoline", chicRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/collection", collectionRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);
app.post('/webhook', (req, res) => {
  console.log('Webhook received:', req.body);

  // Respond to acknowledge receipt of the webhook
  res.status(200).send('Webhook received');
});
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
