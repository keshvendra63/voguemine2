const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    images:[],
    alt:{
      type:String,
    }
    

  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Banner1", bannerSchema);
