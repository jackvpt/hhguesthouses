/** Imports */
const express = require("express")
const router = express.Router()
// const auth = require("../middleware/auth")
const multer = require("multer")
const authCtrl = require("../controllers/auth")

/** Set routes */
router.post("/signup", authCtrl.signup)
router.post("/login", authCtrl.login)
router.get("/validate", authCtrl.validate)
router.put("/update-password", authCtrl.updatePassword)

module.exports = router
