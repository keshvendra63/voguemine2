const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var oldOrderSchema = new mongoose.Schema(
  {
    
   
    orderNumber: {
      type: String,
      unique: true,
    },
      name:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true
      },
      phone:{
        type:Number,
        required:true
      },
      address:{
        type:String,
        // required:true
      },
      city:{
        type:String,
        required:true
      },
      state:{
        type:String,
        required:true
      },
      pincode:{
        type:Number,
        required:true
      },
     
    
    orderItems:{
        typea:String,
    },
    price:{
        type:String,
    },
    itemSku:{
        type:String
    },
    paidAt:{
      type:Date,
      default:Date.now()
    },
    month:{
      type:String,
      default:new Date().getMonth()
    },
    totalAmount:{
      type:Number,
      required:true
    },
    shippingCost:{
      type:Number,
      required:true
    },
    orderType:{
      type:String,
      required:true
    },
    discount:{
      type:Number,
      required:true,
    },
    finalAmount:{
      type:Number,
      required:true
    },

    
  },
  {
    timestamps: true,
  }
);


const Oldorder = mongoose.model("Oldorder", oldOrderSchema);

module.exports = Oldorder;
