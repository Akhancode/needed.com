const mongoose =  require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var crypto = require('crypto')

const otpGenerator = require('otp-generator');

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide a name'],
        maxlength:[50,'Name should be under 50 characters']
    },
    email:{
        type:String,
        required:[true,'Please provide a email'],
        validate: [validator.isEmail,'Please Enter email in format'],
        unique:true
          },
    password:{
        type:String,
        required:[false,'Please provide a password'],
        minlength:[6,'password should be at least 6 charactors'],
        select: false
        },
    role:{
        type:String,
        default : "user"
        },
    forgotPasswordToken:String,
    forgotPasswordExpiry : Date,

    OTP:String,
    OTPExpiry : Date,
    
    photo:{
        id:{
            type:String,
            // required:true
        },
        secure_url:{
            type:String,
            // required:true
        }
        },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
    
}) 

//ENCRYPT PASSWORD BEFORE SAVE using Hooks
userSchema.pre('save',async function(next){
    //skip the line by checking modification of password
    if(!this.isModified('password')) return next() ;
    this.password = await bcrypt.hash(this.password,10)
    this.forgotPasswordToken = undefined
    this.forgotPasswordExpiry = undefined
})

//VALIDATE PASSWORD with passed on user password
userSchema.methods.IsvalidatePassword = async function(usersendPassword){
    return await bcrypt.compare(usersendPassword,this.password)
}

//CREATE AND RETURN JWT TOKEN
userSchema.methods.getJwtToken = function(){
    //CREATE TOKEN 
    return jwt.sign(
        { id:this._id},
        process.env.JWT_SECRET,
        { expiresIn:process.env.JWT_EXPIRY }
        )
}


//GENERATE FORGOT PASSWORD TOKEN
userSchema.methods.getForgotPasswordToken = function(){
    //GENERATE LONG AND RANDOM STRING
    const forgetToken = crypto.randomBytes(20).toString('hex')
    // getting a hash 
    this.forgotPasswordToken = crypto
        .createHash('sha256')
        .update(forgetToken)
         .digest("hex")

    //TIME OF TOKEN 
    this.forgotPasswordExpiry = Date.now() +20*60*1000

    return forgetToken
}



//GENERATE Signup  TOKEN  for validation of Email. 
 userSchema.methods.getSignupToken = function(){

    //CREATE TOKEN FOR SIGN UP 
    return jwt.sign(
        { id:this._id},
        process.env.JWT_SECRET,
        { expiresIn:process.env.JWT_SIGNUP_EXPIRY }
        )
  
}
//GENERATE Signup OTP for validation of Email. 
 userSchema.methods.getOtp = function(){
        //GERNERATE OTP 
    
    // The OTP_LENGTH is a number, For my app i selected 10.
    // The OTP_CONFIG is an object that looks like 
    const OTP_LENGTH = 5;
    const OTP_CONFIG =  {
        upperCaseAlphabets: true,
        specialChars: false,
    }

    const otp = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
    
    this.OTP = otp


    //TIME OF TOKEN 
    this.OTPExpiry = Date.now() +5*60*1000

    return this.OTP
}


module.exports = mongoose.model('User',userSchema)
