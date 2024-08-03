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
    alt:{
      type:String,
    },
    order:{
      type:Number,
    },
    handle: {
      type: String,
      unique: true,
      lowercase: true,
      required:true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    price1: {
      type: Number,
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
        name:String,
        email:String,
        comment: String,
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
    ],
    collectionName:{
      type: String,
      required: true,
    },
    variants:[
      {
        color:{
          type:String,
          default:"",
        },
        size:{
          type:String,
          default:"",
        },
        quantity:{
          type:Number,
          default:0,
        },
      },
    ],
    tags:{
      type:String,
    },
    metaDesc:{
      type:String,
    },
    metaTitle:{
      type:String,
    },
    metaDesc1:{
      type:String,
    },
    metaTitle1:{
      type:String,
    },
    metaDesc2:{
      type:String,
    },
    metaTitle2:{
      type:String,
    },
    metaDesc3:{
      type:String,
    },
    metaTitle3:{
      type:String,
    },
    metaDesc4:{
      type:String,
    },
    metaTitle4:{
      type:String,
    },
    
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
