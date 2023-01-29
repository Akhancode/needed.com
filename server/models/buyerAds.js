const mongoose =  require('mongoose')


const buyerAdSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide a name'],
        maxlength:[120,'Name should be under 120 characters'],
        trim:true
    },
    fromPrice:{
        type:Number,
        required:[true,'Please provide a price'],
    },
    toPrice:{
        type:Number,
        required:[true,'Please provide a price'],
    },
    description:{
        type:String,
        maxlength:[1000,'Name should be under 1000 characters'],
        required:[true,'Please provide a description'],
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
    category:{
        type:String,
        required:[true,'Select any category from given Category '],
        enum:{
            values:['Mobiles', 'beauty products', 'bikes', 'furniture', 'Pets', 'Books & Hobbies', 'Sports ', 'Electronics & Appliances', 'Properties', 'Services', 'Mobiles', 'beauty products', 'bikes', 'furniture', 'Pets', 'Books & Hobbies', 'Sports ', 'Electronics & Appliances', 'Properties', 'Services', 'Mobiles', 'beauty products', 'bikes', 'furniture', 'Pets', 'Books & Hobbies', 'Sports ', 'Electronics & Appliances', 'Properties', 'Services', 'Mobiles', 'beauty products', 'bikes', 'furniture', 'Pets', 'Books & Hobbies', 'Sports ', 'Electronics & Appliances', 'Properties', 'Services'],
            message:"Select any category from category list"
        }

    },

    brand:{
        type:String,
        // required:[true,'Please provide a Brand'],
    },
    stock:{
        type:Number,
        // required:[true,'Please provide a stock'],
    },
    rating:{
        type:String,
        // required:[true,'Please provide a name'],
    },
    number_of_review:{
        type:Number,
        default:0
        // required:[true,'Please provide a name'],
    },
    reviews : [{
        user : {
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true
        },
        name : {
            type:String,
            required:true
        },
        rating : {
            type:Number,
            required:true
        },
        comment : {
            type:String,
            // required:true
        }
    } 
    ],
    user : {
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
})





module.exports = mongoose.model('BuyerAd',buyerAdSchema)
