const mongoose=require('mongoose')

var chickSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    banner:[

    ],
    metaTitle:{
        type:String,
    },
    metaDesc:{
        type:String,
    },
    collections:[
        {
            cname:{
                type:String,
                required:true
            },
            img:[

            ],
            url:{
                type:String,
                required:true
            },
            order:{
                type:Number
            },
            handle:{
                type:String
            },
            metaTitle:{
                type:String,
            },
            metaDesc:{
                type:String,
            },

        }
    ]
})

module.exports = mongoose.model("ChicCollection", chickSchema);
