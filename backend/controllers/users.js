/** Imports */
const User = require("../models/User")

const fs = require("fs")

/** GET All Users */
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find()
    res.status(200).json(allUsers)
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error retrieving users." })
  }
}
