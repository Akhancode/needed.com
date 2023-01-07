const express = require('express')
const { createBuyerAd, getSingleAd,getMyAds, updateSingleAd, adminallAds, deleteSingleAd, getSingleUserMyAds, getAllAds } = require('../controller/buyerAdsController')
const router = express.Router()
const { isLoggedIn, customRole } = require('../middleware/user')

//USER
router.route("/buyers/ads/create").post(isLoggedIn,createBuyerAd)
router.route("/buyers/ads/:id").get(isLoggedIn,getSingleAd)
router.route("/buyers/ads/:id").post(isLoggedIn,updateSingleAd)
router.route("/buyers/ads/:id").delete(isLoggedIn,deleteSingleAd)
router.route("/buyers/myads").get(isLoggedIn,getMyAds)
//ADMIN
router.route("/admin/buyers/ads").get(isLoggedIn,customRole("admin"),adminallAds)
router.route("/admin/buyers/ads/:id").get(isLoggedIn,customRole("admin"),getSingleAd)
router.route("/admin/buyers/ads/:id").post(isLoggedIn,customRole("admin"),updateSingleAd)
router.route("/admin/buyers/user/:id").get(isLoggedIn,customRole("admin"),getSingleUserMyAds)

//PUBLIC
router.route("/wantedtobuy/ads").get(getAllAds)
router.route("/wantedtobuy/ads/:id").get(getSingleAd)

module.exports = router