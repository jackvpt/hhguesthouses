import axios from "axios"
import { API_URL } from "./apiURL"

// Base URL for authentication-related endpoints
const BASE_URL = `${API_URL}/guesthouses`

/**
 * Fetch all guest houses from the API.
 *
 * @async
 * @function fetchAllGuestHouses
 * @returns {Promise<Object[]>} A promise that resolves to an array of guest house objects.
 * @throws {Error} Throws an error if the API request fails.
 */
export const fetchAllGuestHouses = async () => {
  try {
    /**
     * Make the GET request to fetch all guest houses.
     */
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error(`Error fetching guest houses data from API: ${error.message}`)
    throw error
  }
}
