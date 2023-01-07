const express = require("express");
const morgan = require("morgan");
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const bodyParser = require("body-parser");


const app = express();


//REGULAR MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//COOKIES AND FILE MIDDLEWARE 
app.use(cookieParser())
app.use(fileUpload(
    {
        useTempFiles:true,
        tempFileDir:"/tmp/"
    }
))/*
app.use(fileUpload(
    {
        useTempFiles:true,
        tempFileDir:"/tmp/"
    }
))

*/     


//IMPORT ALL ROUTES
const home = require('./routes/home')
const user = require('./routes/user');
const buyer = require('./routes/buyerAds');
 
//ROUTER MIDDLEWARE
app.use('/api/v1',home);
app.use('/api/v1',user);
app.use('/api/v1',buyer);
// app.use('/api/v1',buyerAds);


//EXPORT APP JS
module.exports = app