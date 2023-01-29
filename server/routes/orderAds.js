const express = require('express')
const { createOrder, getMyOrders, getMyOffers, updateMyOffersAccept } = require('../controller/adsController')
const router = express.Router()
const { isLoggedIn, customRole } = require('../middleware/user')

//USER
router.route("/order/create").post(isLoggedIn,createOrder)
router.route("/order/myorders").get(isLoggedIn,getMyOrders)
router.route("/order/myoffers").get(isLoggedIn,getMyOffers)
router.route("/order/AcceptOffer/:id").put(isLoggedIn,updateMyOffersAccept)

//ADMIN


//PUBLIC

module.exports = router