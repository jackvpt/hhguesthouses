/** Imports */
const Occupancy = require("../models/Occupancy")

const fs = require("fs")

/** GET All Occupancies */
exports.getAllOccupancies = async (req, res) => {
  try {
    const allOccupancies = await Occupancy.find()
    res.status(200).json(allOccupancies)
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error retrieving occupancies." })
  }
}
