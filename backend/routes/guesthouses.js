/** Imports */
const express = require("express")
const router = express.Router()
// const auth = require("../middleware/auth")
const multer = require("multer")
const guestHousesCtrl = require("../controllers/guestHouses")

/** Set routes */
router.get("/", guestHousesCtrl.getAllGuestHouses)

module.exports = router
