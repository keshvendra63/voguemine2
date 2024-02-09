const { default: mongoose } = require("mongoose");

const dbConnect=()=>{
    try{
        const conn=mongoose.connect(process.env.MONGODB_URL)
        console.log("Database Connected Successfully")
    }
    catch(error){
        console.log(`Database is unable to coonect due to: ${error}`)
    }

    
};
module.exports=dbConnect;