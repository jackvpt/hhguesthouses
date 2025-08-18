/** Imports */
const User = require("../models/User")
const Auth = require("../models/Auth")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
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

/** SIGNUP new User + Auth */
exports.signup = async (req, res) => {
  const { firstName, lastName, codeName, email, password, role } = req.body

  if (!firstName || !lastName || !codeName || !email || !password) {
    return res.status(400).json({ error: "All fields are required." })
  }

  /** Check password validity */
  if (!isValidPassword(req.body.password)) {
    return res.status(400).json({
      error:
        "Password is not valid (8 caracters mini, 1 uppercase, 1 lowercase, 1 number, 1 special car !",
    })
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ error: "Email is already in use." })
    }
    console.log("code :>> ", codeName)

    // Create the User
    const newUser = new User({
      firstName,
      lastName,
      codeName,
      email,
      role,
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
    console.log("error/message :>> ", error.message)
    res.status(500).json({
      error: error.message || "Error creating user.",
    })
  }
}

/** LOGIN User */
exports.login = async (req, res) => {
  console.log("Login connection trial :>> ", req.body.email)

  try {
    /** Find the user by email */
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(401).json({ message: "UserID/Password incorrect" })
    }

    /** Find the Auth by userId */
    const auth = await Auth.findOne({ userId: user._id })
    if (!auth) {
      return res.status(401).json({ message: "Auth not found for this user" })
    }

    /** Compare entered password with stored hash */
    const valid = await bcrypt.compare(req.body.password, auth.passwordHash)

    if (!valid) {
      return res.status(401).json({ message: "UserID/Password incorrect" })
    }

    /** Success: return token & user data */
    console.log(
      "Access granted :>> ",
      `${user.firstName} ${user.lastName} - ${user.role}`
    )

    await createLog(req.body.email, "Logged in")

    res.status(200).json({
      userId: user._id,
      token: jwt.sign(
        {
          userId: user._id,
          role: user.role,
        },
        process.env.SECRET_TOKEN,
        { expiresIn: process.env.TOKEN_EXPIRATION || "7d" }
      ),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      codeName: user.codeName,
      role: user.role,
      settings: user.settings,
    })
  } catch (error) {
    console.error("Access denied :>> ", error)
    res.status(500).json({ error })
  }
}

/** DELETE User */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    await Auth.deleteOne({ userId: user._id }) // Delete the Auth entry
    await user.deleteOne() // Delete the user

    res.status(200).json({ message: "User and Auth deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/** VALIDATE token */
exports.validate = async (req, res) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" })
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN)

    // Check if user exists
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({ message: "Invalid token: user not found" })
    }

    await createLog(user.email, "Token validated")

    // Return user data
    res.status(200).json({
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      codeName: user.codeName,
      role: user.role,
    })
  } catch (error) {
    console.error("Token validation failed:", error.message)
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}
