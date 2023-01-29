const BigPromise = require('../middleware/bigPromise')
const BuyerAds = require('../models/buyerAds')
const CustomError = require('../utils/customError')
const cloudinary = require('cloudinary')
const category = require('../models/category')


exports.createCategory = BigPromise( async  (req,res,next)=>{
  
    var categoryList
      try{
          req.body.user = req.user.id
          console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
          //DATA OF PRODUCT
           categoryList = await category.create(req.body)

        }catch(error){
           
            console.log(error)
            return next(new CustomError("Error in Creating New Ads Please check information Entered !",401))
        }
          
      console.log("success created Category")
      
      //const db = await something
      res.status(200).json({
        success:true,
        greeting:" created an Category",
        categoryList

      })}
      )




exports.allCategory = BigPromise(async (req,res,next)=>{
        const categoryList = await category.find()
    
        res.status(200).json({
         success:true,
         categoryList
        })
    })