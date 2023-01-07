const express = require('express')
const router = express.Router()

const {signup, verifyEmailSignup, login, logout, forgetpassword, resetpassword, getLoggedInUserDetails, adminalluser, admingetsingleuser, adminupdatesingleuser, admindeletesingleuser, updatesingleuser, deleteSingleUser, changepassword} =require('../controller/userController')
const {isLoggedIn,customRole, validatingPassword} =require('../middleware/user')

//USER API
router.route('/signup').post(signup)
router.route('/signup/verification/:token').get(verifyEmailSignup)
router.route('/login').post(login)
router.route('/logout').get(isLoggedIn,logout)
router.route('/forgetpassword').post(forgetpassword)
router.route('/password/reset/:token').post(resetpassword)
router.route('/userdashboard').get(isLoggedIn,getLoggedInUserDetails)
router.route('/userdashboard').put(isLoggedIn,updatesingleuser)
router.route('/userdashboard').delete(isLoggedIn,deleteSingleUser)
router.route('/userdashboard/updatePassword').post(isLoggedIn,changepassword)

//ADMIN API
router.route('/admin/users').get(isLoggedIn,customRole("admin"),adminalluser)
router.route('/admin/user/:id')
.get(isLoggedIn,customRole("admin"),admingetsingleuser)
.put(isLoggedIn,customRole("admin"),adminupdatesingleuser)
.delete(isLoggedIn,customRole("admin"),admindeletesingleuser)

module.exports = router