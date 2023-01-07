const express = require('express')
const { home, home_Catch } = require('../controller/homeController')
const router = express.Router()

router.route("/home").get(home)
router.route("/homeCatch").get(home_Catch)


module.exports = router