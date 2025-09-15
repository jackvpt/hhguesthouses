/** Imports */
const express = require("express")
const router = express.Router()
// const auth = require("../middleware/auth")
const multer = require("multer")
const occupanciesCtrl = require("../controllers/occupancies")

/** Set routes */
router.get("/", occupanciesCtrl.getAllOccupancies)
router.post("/",multer().none(), occupanciesCtrl.createOccupancy)
router.delete("/:id", occupanciesCtrl.deleteOccupancy)
router.put("/:id",multer().none(), occupanciesCtrl.updateOccupancy)

module.exports = router

