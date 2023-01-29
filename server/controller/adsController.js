const BigPromise = require('../middleware/bigPromise')
const BuyerAds = require('../models/buyerAds')
const CustomError = require('../utils/customError')
const cloudinary = require('cloudinary')
const WhereClause = require('../utils/whereClause')
const orders = require('../models/orders')



exports.createOrder = BigPromise( async  (req,res,next)=>{
    console.log("Hello create order")
    //IMAGE UPLOADING TO CLOUDINARY
    let imageArray = []
    var Order 
    console.log(await req.files.photos.length)
    if(!req.files){
      return next(new CustomError("Images are required"))
    }
    if(req.files){
      //single file upload
      //CHECK FILES IN REQUEST THEN ONLY upload to cloudinary (image)
      if (!req.files.photos.length) {
           console.log("single Ad")
           console.log(req.files.photos)
          let file =req.files.photos

          try {
            let result = await cloudinary.v2.uploader.upload(file.tempFilePath,{ 
              folder:`ineed/orders/${req.user.email}_${req.user.id}`,
             //  width :150,
             //  crop:"scale"
           })
            
            imageArray.push({
                id:result.public_id,
                secure_url : result.secure_url
              })
            
          } catch (error) {
            console.log("Error Adding to cloudinary")
            console.log(error)
          }

           }
          // multiple file upload
      else{   
        for (let index = 0; index < req.files.photos.length; index++) {
          try {
            let result = await cloudinary.v2.uploader.upload(req.files.photos[index].tempFilePath,{
              folder:`ineed/orders/${req.user.email}_${req.user.id}`
            })
            
            imageArray.push({
                id:result.public_id,
                secure_url : result.secure_url
              })
            
          } catch (error) {
            console.log("Error Adding to cloudinary")
            console.log(error)
          }
          }
      }
    }
    //   IF ANYTHING ERROR HAPPENS AFTER UPLOADING PHOTO
      try{
          req.body.photos = imageArray
          req.body.order_owner = req.user.id
          console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
          console.log(req.body)
          //DATA OF PRODUCT
          Order = await orders.create(req.body)

        }catch(error){
            console.log(" deleting from cloudinary")
            console.log(error)
            for (let index = 0; index < imageArray.length; index++) {
                
                //destroy existing images
                
                const result = await cloudinary.v2.uploader.destroy(imageArray[index].id)
                
            }
            return next(new CustomError("Error in Creating New Order Please check information Entered !",401))
        }
          
      console.log("success created AD")
      
      //const db = await something
      res.status(200).json({
        success:true,
        greeting:" created an AD",
        Order

      })}
      )
exports.getMyOrders = BigPromise( async  (req,res,next)=>{
     
        var myorders = await orders.find( { order_owner: req.user.id  } )
        console.log(myorders)
        totalcountProduct =  myorders.length
   
        res.status(200).json({
          success:true,
          total_orders:totalcountProduct,
          myorders,
        //   search_result:filteredProductNumber,
        })
      })
exports.getMyOffers = BigPromise( async  (req,res,next)=>{
     
        var myoffers = await orders.find( { ad_owner_id: req.user.id  } )
        // console.log(myoffers)
        totalcountProduct =  myoffers.length
   
        res.status(200).json({
          success:true,
          total_orders:totalcountProduct,
          myoffers,
        //   search_result:filteredProductNumber,
        })
      })
exports.updateMyOffersAccept = BigPromise( async  (req,res,next)=>{

    const newData = {}
    newData.status = "Accepted"

    //FIND USER AND UPDATE.
    let  order = await orders.findByIdAndUpdate(req.params.id,newData,{
      new:true,
      runValidators:true,
      useFindAndModify:false,
 })
 // RESPONSE SENDING .
 res.status(200).json({
      success:true,
      message:"updated successully",
      order
 })

})
