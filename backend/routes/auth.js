/** Imports */
const express = require("express")
const router = express.Router()
// const auth = require("../middleware/auth")
const multer = require("multer")
const authCtrl = require("../controllers/auth")

/** Set routes */
router.post("/signup", authCtrl.signup)
router.post("/login", authCtrl.login)

module.exports = router
