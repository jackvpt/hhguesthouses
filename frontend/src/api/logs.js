import axios from "axios"
import { API_URL } from "./apiURL"

// Base URL for authentication-related endpoints
const BASE_URL = `${API_URL}/logs`

/**
 * Fetch all logs from the API.
 *
 * @returns {Promise<Object[]>} Array of log objects.
 * @throws {Error} If the request fails.
 */
export const fetchAllLogs = async () => {
  try {
    /**
     * Make the GET request to fetch all logs.
     */
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error(`Error fetching log data from API: ${error.message}`)
    throw error
  }
}
