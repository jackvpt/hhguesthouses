/** Imports */
const express = require("express")
const router = express.Router()
// const auth = require("../middleware/auth")
const multer = require("multer")
const usersCtrl = require("../controllers/users")

/** Set routes */
router.get("/", usersCtrl.getAllUsers)

module.exports = router
