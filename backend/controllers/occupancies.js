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

/** POST New Occupancy */
exports.createOccupancy = async (req, res) => {
  const occupancyObject = req.body

  try {
    const occupancy = new Occupancy({
      ...occupancyObject,
    })

    await occupancy.save()
    res.status(201).json(occupancy)
    console.log(
      `Occupancy created: ${occupancy.house} - ${occupancy.room}`
    )
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error adding occupancy!" })
  }
}
