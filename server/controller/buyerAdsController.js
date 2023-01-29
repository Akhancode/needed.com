const BigPromise = require('../middleware/bigPromise')
const BuyerAds = require('../models/buyerAds')
const CustomError = require('../utils/customError')
const cloudinary = require('cloudinary')
const WhereClause = require('../utils/whereClause')
const buyerAds = require('../models/buyerAds')


exports.createBuyerAd = BigPromise( async  (req,res,next)=>{
  
    //IMAGE UPLOADING TO CLOUDINARY
    let imageArray = []
    var BuyerAd 
    console.log(await req.files.photos.length)
    if(!req.files){
      return next(new CustomError("Images are required"))
    }
    if(req.files){
      
      for (let index = 0; index < req.files.photos.length; index++) {
        try {
          let result = await cloudinary.v2.uploader.upload(req.files.photos[index].tempFilePath,{
            folder:`ineed/buyerAds/${req.user.email}_${req.user.id}`
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
    //   IF ANYTHING ERROR HAPPENS AFTER UPLOADING PHOTO
      try{
          req.body.photos = imageArray
          req.body.user = req.user.id
          console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
          //DATA OF PRODUCT
          BuyerAd = await BuyerAds.create(req.body)

        }catch(error){
            console.log(" deleting from cloudinary")
            console.log(error)
            for (let index = 0; index < imageArray.length; index++) {
                
                //destroy existing images
                
                const result = await cloudinary.v2.uploader.destroy(imageArray[index].id)
                
            }
            return next(new CustomError("Error in Creating New Ads Please check information Entered !",401))
        }
          
      console.log("success created AD")
      
      //const db = await something
      res.status(200).json({
        success:true,
        greeting:" created an AD",
        BuyerAd

      })}
      )

exports.getSingleAd = BigPromise( async  (req,res,next)=>{
        
    // const ad =await  buyerAds.findById(req.params.id)
    const ad = await buyerAds.findById(req.params.id) //.find({user: {$in: [req.user.id]}})
        if(!ad){
          return next(new CustomError("no ad found from this id ",401))
        }
        res.status(200).json({
          success:true,
          ad,
          })
      })
exports.updateSingleAd = BigPromise( async  (req,res,next)=>{
        console.log(req.user)
        const currentAd = await buyerAds.findById(req.params.id)
        console.log(currentAd)
        if(currentAd.user.toString() !== req.user.id.toString() && req.user.role !== "admin"){
            return next(new CustomError("No Access to this route ",401))
        }
        console.log("ACCESS GRANTED")
        //CREATING AN EMPTY OBJECT
        const newData = {}
   
        //CHECK REQ . price AND NAME ENTERED ONLY THEN ADD TO OBJECT .
        if(req.body.fromPrice){
             newData.fromPrice = req.body.fromPrice
        }
        if(req.body.toPrice){
             newData.toPrice = req.body.toPrice
        }
        if(req.body.name){
             newData.name = req.body.name
        }
     
     
        // CHECK FILE ATTACHED (PHOTO) THEN DELETE PREVIOUS PHOTO AND UPLOAD NEW ONE.
        if(req.files){
             const currentAd = await buyerAds.findById(req.params.id)
            
          
   
            //  console.log(" deleting from cloudinary")
            for (let index = 0; index < currentAd.photos.length; index++) {
                
                //destroy existing images
                
                const result = await cloudinary.v2.uploader.destroy(currentAd.photos[index].id)
                
            }
            let imageArray = []
            for (let index = 0; index < req.files.photos.length; index++) {
        
                let result = await cloudinary.v2.uploader.upload(req.files.photos[index].tempFilePath,{
                  folder:"ineed/buyerAds"
                })
        
                imageArray.push({
                    id:result.public_id,
                    secure_url : result.secure_url
                  })
                }
   
             newData.photos = imageArray
        }
          //FIND USER AND UPDATE.
         const ad = await buyerAds.findByIdAndUpdate(req.params.id,newData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
   })
   // RESPONSE SENDING .
   res.status(200).json({
        success:true,
        // message:`updated with user ${user.name} ::: name : ${newData.name},email : ${newData.email}, ${newData.photo?'photo :'+ newData.photo.id :null}`,
        ad
   })
      })
exports.deleteSingleAd = BigPromise( async  (req,res,next)=>{
        
        const currentAd = await buyerAds.findById(req.params.id)
        if(currentAd.user.toString() !== req.user.id.toString() && req.user.role !== "admin"){
            return next(new CustomError("No Access to this route ",401))
        }
        console.log("ACCESS GRANTED")
    //FIND USER AND DELETE.
    const ad = await buyerAds.findByIdAndDelete(req.params.id)
    if(!ad){
         return next(new CustomError("No user Found in this ID",401))
  
    }
    //PHOTO ID FROM USER
    const photo_id = await ad?.photos.id 
    if(photo_id){

        for (let index = 0; index < ad.photos.length; index++) {
            //destroy existing image   
            await cloudinary.v2.uploader.destroy(ad.photos[index].id)
            
        }
    }
   

    
    // RESPONSE SENDING .
    res.status(200).json({
         success:true,
         message:`Deleted User ${ad.name} `
    })
      })

exports.getMyAds = BigPromise( async  (req,res,next)=>{
     
        const search = req.query.search
        var ads = await buyerAds.find( { user: req.user.id  } )
       
        totalcountProduct =  ads.length
   
        res.status(200).json({
          success:true,
          total_ads:totalcountProduct,
          ads,
        //   search_result:filteredProductNumber,
        })
      })

exports.adminallAds = BigPromise(async (req,res,next)=>{
        const ads = await buyerAds.find()
    
        res.status(200).json({
         success:true,
         ads
        })
    })

exports.getSingleUserMyAds = BigPromise( async  (req,res,next)=>{
     
     
      var ads = await buyerAds.find( { user: req.params.id  } )
     
      totalcountProduct =  ads.length
 
      res.status(200).json({
        success:true,
        total_ads:totalcountProduct,
        ads,
      //   search_result:filteredProductNumber,
      })
    })
    
//PUBLIC
exports.getAllAds = BigPromise(async (req,res,next)=>{
      
      // SEARCHING WORD IN ADS
      const searchword = req.query.search?{ name: { $regex: req.query.search, $options: "i" } }:{}
      const category = req.query.category?{ category: { $regex: req.query.category, $options: "i" } }:{}
      const sortOrder = req.query.sort?{ fromPrice: (req.query.sort=="priceAsc"?1:-1) }:{}
      
      const ads = await buyerAds.find(category).find(searchword).sort(sortOrder)
      const TotalAds = ads.length
      res.status(200).json({
       success:true,
       TotalAds,
       ads
      })
  })

  
