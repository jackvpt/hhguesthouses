/** Imports */
const express = require("express")
const router = express.Router()
// const auth = require("../middleware/auth")
const multer = require("multer")
const occupanciesCtrl = require("../controllers/occupancies")

/** Set routes */
router.get("/", occupanciesCtrl.getAllOccupancies)

module.exports = router
