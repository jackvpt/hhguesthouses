/** Imports */
const GuestHouse = require("../models/GuestHouse")

const fs = require("fs")

/** GET All Guest Houses */
exports.getAllGuestHouses = async (req, res) => {
  try {
    const allGuestHouses = await GuestHouse.find()
    res.status(200).json(allGuestHouses)
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error retrieving guest houses." })
  }
}
