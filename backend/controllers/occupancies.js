/** Imports */
const jwt = require("jsonwebtoken")

const Occupancy = require("../models/Occupancy")

const fs = require("fs")
const createLog = require("../utils/Logger")
const User = require("../models/User")
const { formatDateToDDMM } = require("../utils/dateTools")
const { getUserFromToken } = require("../utils/authTools")

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
  const user = getUserFromToken(req.headers.authorization)

  const occupancyObject = req.body

  try {
    const occupancy = new Occupancy({
      ...occupancyObject,
    })

    await occupancy.save()

    const logString = [
      occupancy.occupantCode,
      occupancy.house,
      occupancy.room,
      formatDateToDDMM(occupancy.arrivalDate),
      formatDateToDDMM(occupancy.departureDate),
    ]

    await createLog(user.email, "Occupancy created", logString.join(" | "))

    res.status(201).json(occupancy)
    console.log(`Occupancy created: ${occupancy.house} - ${occupancy.room}`)
  } catch (error) {
    res.status(400).json({ error: error.message || "Error adding occupancy!" })
  }
}

/** DELETE One Occupancy */
exports.deleteOccupancy = async (req, res) => {
  const user = getUserFromToken(req.headers.authorization)

  try {
    const occupancy = await Occupancy.findById(req.params.id)

    await Occupancy.deleteOne({ _id: req.params.id })

    const logString = [
      occupancy.occupantCode,
      occupancy.house,
      occupancy.room,
      formatDateToDDMM(occupancy.arrivalDate),
      formatDateToDDMM(occupancy.departureDate),
    ]

    await createLog(user.email, "Occupancy deleted", logString.join(" | "))

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
  const user = getUserFromToken(req.headers.authorization)

  try {
    const occupancyObject = req.body
    occupancyObject.updatedAt = new Date()
    const updatedOccupancy = await Occupancy.findByIdAndUpdate(
      req.params.id,
      { ...occupancyObject, _id: req.params.id },
      { new: true }
    )

    const logString = [
      updatedOccupancy.occupantCode,
      updatedOccupancy.house,
      updatedOccupancy.room,
      formatDateToDDMM(updatedOccupancy.arrivalDate),
      formatDateToDDMM(updatedOccupancy.departureDate),
    ]

    await createLog(user.email, "Occupancy updated", logString.join(" | "))

    res.status(200).json(updatedOccupancy)
    console.log(
      `Occupancy updated: ${updatedOccupancy._id} - ${updatedOccupancy.house} - ${updatedOccupancy.room}`
    )
  } catch (error) {
    res.status(401).json({ error })
  }
}
