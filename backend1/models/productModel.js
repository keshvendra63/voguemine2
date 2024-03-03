const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique:false,
    },
    handle: {
      type: String,
      required: true,
      unique: false,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    sku:{
      type:String,
      required:true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating: {
      type: Number,
      default: 0,
    },
    state:{
      type:String,
      required:true,
      default:"active"
    },

    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    collectionName:{
      type: String,
      required: true,
    },
    variants:[
      {
        color:String,
        size:String,
        quantity:Number,
      },
    ],
    tags:{
      type:String,
    },
    
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
