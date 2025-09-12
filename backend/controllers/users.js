/** Imports */
const User = require("../models/User")
const Auth = require("../models/Auth")

const bcrypt = require("bcrypt")
const { getUserFromToken } = require("../utils/authTools")
const createLog = require("../utils/Logger")

/** Check password validity */
const isValidPassword = (password) => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChars
  )
}

/** GET All Users */
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find()
    res.status(200).json(allUsers)
  } catch (error) {
    res.status(400).json({ error: error.message || "Error retrieving users." })
  }
}

/** CREATE new User + Auth */
exports.createUser = async (req, res) => {
  const { firstName, lastName, codeName, email, password, privileges } =
    req.body

  if (
    !firstName ||
    !lastName ||
    !codeName ||
    !email ||
    !password ||
    !privileges
  ) {
    return res.status(400).json({ error: "All fields are required." })
  }

  /** Check password validity */
  if (!isValidPassword(req.body.password)) {
    return res.status(400).json({
      error:
        "Password is not valid (8 caracters mini, 1 uppercase, 1 lowercase, 1 number, 1 special car !",
    })
  }

  // Check if the email already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists." })
  }

  try {
    // Create the User
    const newUser = new User({
      firstName,
      lastName,
      codeName,
      email,
      privileges,
    })
    await newUser.save()

    // Hash the password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create the Auth entry
    const newAuth = new Auth({
      userId: newUser._id,
      passwordHash: passwordHash,
    })
    await newAuth.save()

    res.status(201).json({
      message: "User created successfully.",
      user: newUser,
    })
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error creating user.",
    })
  }
}

/** PUT Update User */
exports.updateUser = async (req, res) => {
  try {
    const userObject = req.body
    const user = await getUserFromToken(req.headers.authorization)

    // Get old user data
    const oldUser = await User.findById(req.params.id)

    // Update
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...userObject, _id: req.params.id, updatedAt: new Date() },
      { new: true }
    )

    // Compare oldUser and updatedUser
    let changes = {}
    for (let key in userObject) {
      if (oldUser[key] !== updatedUser[key]) {
        changes[key] = {
          old: oldUser[key],
          new: updatedUser[key]
        }
      }
    }

    // Log with details of changes
    await createLog(user.email, "User updated", changes)

    res.status(200).json(updatedUser)
    console.log(
      `User updated: ${updatedUser.firstName} ${updatedUser.lastName} - changes:`,
      changes
    )
  } catch (error) {
    res.status(401).json({ error })
  }
}

