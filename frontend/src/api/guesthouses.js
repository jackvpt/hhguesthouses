import axios from "axios"

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api"


export const fetchAllGuestHouses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/guesthouses`)
    return response.data
  } catch (error) {
    console.error(
      `Error fetching guest houses data from API: ${error.message}`
    )
    throw error
  }
}

