import axios from "axios"
import { API_URL } from "./apiURL"

// Base URL for authentication-related endpoints
const BASE_URL = `${API_URL}/occupancies`

/**
 * Fetch all occupancies from the API.
 *
 * @returns {Promise<Object[]>} Array of occupancy objects.
 * @throws {Error} If the request fails.
 */
export const fetchAllOccupancies = async () => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error(`Error fetching occupancy data from API: ${error.message}`)
    throw error
  }
}

/**
 * Create a new occupancy.
 *
 * @param {Object} occupancyData - Data for the new occupancy.
 * @returns {Promise<Object>} The created occupancy object.
 * @throws {Error} If the request fails.
 */
export const postOccupancy = async (occupancyData) => {
  try {
    // Retrieve the token from localStorage or sessionStorage
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token")

    /**
     * Make the POST request to create a new occupancy.
     * The token is included in the Authorization header.
     */
    const { data } = await axios.post(BASE_URL, occupancyData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    return data
  } catch (error) {
    console.error("Error posting occupancy:", error.message)
    throw error
  }
}

/**
 * Delete an occupancy by ID.
 *
 * @param {string|number} id - The ID of the occupancy to delete.
 * @returns {Promise<Object>} The response from the API.
 * @throws {Error} If the request fails.
 */
export const deleteOccupancy = async (id) => {
  try {
    // Retrieve the token from localStorage or sessionStorage
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token")

    /**
     * Make the DELETE request to delete the occupancy by ID.
     * The token is included in the Authorization header.
     */
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error deleting occupancy :", error.message)
    throw error
  }
}

/**
 * Update an occupancy by ID.
 *
 * @param {Object} params - The parameters for the update.
 * @param {string|number} params.id - The ID of the occupancy to update.
 * @param {Object} params.updatedData - The updated occupancy data.
 * @returns {Promise<Object>} The updated occupancy object.
 * @throws {Error} If the request fails.
 */
export const updateOccupancy = async ({ id, updatedData }) => {
  try {
    // Retrieve token from localStorage or sessionStorage
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token")

    /**
     * Make the PUT request to update the occupancy.
     * The token is included in the Authorization header.
     */
    const { data } = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    return data
  } catch (error) {
    console.error("Error updating occupancy:", error.message)
    throw error
  }
}
