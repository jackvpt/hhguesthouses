import axios from "axios"
import { API_URL } from "./apiURL"

const BASE_URL = `${API_URL}/auth`

/**
 * Register a new user.
 *
 * @async
 * @function signup
 * @param {Object} userData - The user information for registration.
 * @param {string} userData.username - The username of the user.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password of the user.
 * @returns {Promise<Object>} The response data from the server.
 * @throws {Object} Error response from the server or network error.
 */
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData)
    return response.data
  } catch (error) {
    console.error(error)
    throw error.response?.data || error
  }
}

/**
 * Authenticate a user and retrieve a token.
 *
 * @async
 * @function login
 * @param {Object} userData - The login credentials.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password of the user.
 * @returns {Promise<Object>} The response data containing authentication details.
 * @throws {Object} Error response from the server or network error.
 */
export const login = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData)
    return response.data
  } catch (error) {
    console.error(error)
    throw error.response?.data || error
  }
}

/**
 * Validate an authentication token.
 *
 * @async
 * @function validateToken
 * @param {string} token - The JWT authentication token to validate.
 * @returns {Promise<Object>} The response data confirming token validity.
 * @throws {Object} Error response from the server or network error.
 */
export const validateToken = async (token) => {
  const response = await axios.get(`${BASE_URL}/validate`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}
