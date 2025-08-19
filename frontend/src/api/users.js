import axios from "axios"
import { API_URL } from "./apiURL"

const BASE_URL = `${API_URL}/users`

/**
 * Fetch all users from the API.
 *
 * @returns {Promise<Object[]>} Array of user objects.
 * @throws {Error} If the request fails.
 */
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error(`Error fetching users data from API: ${error.message}`)
    throw error
  }
}

/**
 * Update a user by ID.
 *
 * @param {Object} params - The parameters for the update.
 * @param {string|number} params.id - The ID of the user to update.
 * @param {Object} params.updatedData - The updated user data.
 * @returns {Promise<Object>} The updated user object.
 * @throws {Error} If the request fails.
 */
export const updateUser = async ({ id, updatedData }) => {
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token")

    const { data } = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    return data
  } catch (error) {
    console.error("Error updating user:", error.message)
    throw error
  }
}
