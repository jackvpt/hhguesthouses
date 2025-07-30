import axios from "axios"

const BASE_URL = "http://localhost:3000/api/users"

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error(`Error fetching users data from API: ${error.message}`)
    throw error
  }
}