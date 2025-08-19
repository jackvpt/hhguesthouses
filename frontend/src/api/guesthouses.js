import axios from "axios"
import { API_URL } from "./apiURL"

const BASE_URL = API_URL

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
    const response = await axios.get(`${BASE_URL}/guesthouses`)
    return response.data
  } catch (error) {
    console.error(`Error fetching guest houses data from API: ${error.message}`)
    throw error
  }
}
