import axios from "axios"

import { API_URL } from "./apiURL"

const BASE_URL = API_URL
export const fetchAllGuestHouses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/guesthouses`)
    return response.data
  } catch (error) {
    console.error(`Error fetching guest houses data from API: ${error.message}`)
    throw error
  }
}
