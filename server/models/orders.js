const mongoose =  require('mongoose')


const orderSchema = new mongoose.Schema({
    ad_id:{
        type:String,
        required:[true,'Please provide a name'],
        maxlength:[120,'Name should be under 120 characters'],
    },
    ad_owner_id:{
        type:String,
        required:[true,'Please provide a name'],
        maxlength:[120,'Name should be under 120 characters'],
       
    },
    price:{
        type:Number,
        required:[true,'Please provide a price'],
    },
    message:{
        type:String,
        maxlength:[1000,'Name should be under 1000 characters'],
        required:false
    },
    photos:[
        {
            id:{
                type:String,
                // required:true
            },
            secure_url:{
                type:String,
                // required:true
            }
            }
    ],
    place:{
        type:String,
        required:[true,"please provide a place name"]
    },
    status:{
        type:String,
        default:"pending",
        required:[true,"please provide a place name"]
    },

    order_owner : {
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
})





module.exports = mongoose.model('Order',orderSchema)
