const express = require("express");
const {
  createCategory,
  allCategory,
} = require("../controller/adminOnlyController");
const router = express.Router();

const {
  signup,
  verifyEmailSignup,
  login,
  logout,
  forgetpassword,
  resetpassword,
  getLoggedInUserDetails,
  adminalluser,
  admingetsingleuser,
  adminupdatesingleuser,
  admindeletesingleuser,
  updatesingleuser,
  deleteSingleUser,
  changepassword,
  getSingleUserPublic,
} = require("../controller/userController");
const {
  isLoggedIn,
  customRole,
  validatingPassword,
} = require("../middleware/user");

router
  .route("/admin/category/create")
  .post(isLoggedIn, customRole("admin"), createCategory);
router.route("/admin/category/all").get(allCategory);

module.exports = router;
