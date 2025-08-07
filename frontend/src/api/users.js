import axios from "axios"

import { API_URL } from "./apiURL"

const BASE_URL = `${API_URL}/users`

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error(`Error fetching users data from API: ${error.message}`)
    throw error
  }
}