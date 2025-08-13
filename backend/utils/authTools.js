const jwt = require("jsonwebtoken")
const User = require("../models/User")

/**
* Get user from JWT token.
* @param {string} authHeader - The Authorization header "Bearer <token>"
* @returns {Promise<Object>} - The user without the password
*/
const getUserFromToken = async (authHeader) => {
  if (!authHeader) throw new Error("No token provided")
  
  const token = authHeader.split(" ")[1]
  if (!token) throw new Error("Token malformed")

  const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
  const user = await User.findById(decoded.userId).select("-password")
  if (!user) throw new Error("User not found")

  return user
}

module.exports = { getUserFromToken }
