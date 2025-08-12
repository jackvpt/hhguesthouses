/** Imports */
const Occupancy = require("../models/Occupancy")

const fs = require("fs")
const createLog = require("../utils/Logger")

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

    console.log("occupancy :>> ", occupancy)
    const logString = [
      "New occupancy created",
      occupancy.occupantCode,
      occupancy.house,
      occupancy.room,
      occupancy.arrivalDate,
      occupancy.departureDate,
    ]
    await createLog(req.body.email, logString.join(" | "))

    res.status(201).json(occupancy)
    console.log(`Occupancy created: ${occupancy.house} - ${occupancy.room}`)
  } catch (error) {
    res.status(400).json({ error: error.message || "Error adding occupancy!" })
  }
}

/** DELETE One Occupancy */
exports.deleteOccupancy = async (req, res) => {
  try {
    await Occupancy.deleteOne({ _id: req.params.id })

    await createLog(req.body.email, "Occupancy deleted")

    res.status(200).json({ message: "Occupancy deleted successfully!" })
    console.log(`Occupancy deleted: ${req.params.id}`)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error deleting Occupancy!" })
  }
}

/** PUT Update Occupancy */
exports.updateOccupancy = async (req, res) => {
  const occupancyObject = req.body
  occupancyObject.updatedAt = new Date()

  try {
    const updatedOccupancy = await Occupancy.findByIdAndUpdate(
      req.params.id,
      { ...occupancyObject, _id: req.params.id },
      { new: true }
    )
    const logString = [
      "Occupancy updated",
      updatedOccupancy.occupantCode,
      updatedOccupancy.house,
      updatedOccupancy.room,
      updatedOccupancy.arrivalDate,
      updatedOccupancy.departureDate,
    ]

    await createLog(req.body.email, logString.join(" | "))

    res.status(200).json(updatedOccupancy)
    console.log(
      `Occupancy updated: ${updatedOccupancy._id} - ${updatedOccupancy.house} - ${updatedOccupancy.room}`
    )
  } catch (error) {
    res.status(401).json({ error })
  }
}
