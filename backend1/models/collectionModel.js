const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var collectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    img:{
      type:String,

    },
    category:{
      type:String,
      
    },
    handle:{
      type:String,
      unique: true,
      lowercase: true,
    },
    status:{
      type:String,
    },
    products:[
      {
        product:{
          type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        }
      }
    ]

  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Collection", collectionSchema);
