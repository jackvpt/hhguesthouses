import axios from "axios"

const BASE_URL = "http://localhost:3000/api/auth"

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData)
    return response.data
  } catch (error) {
    console.error(`Error signing up: ${error.message}`)
    throw error
  }
}

export const login = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData)
    return response.data
  } catch (error) {
    console.error(`Error logging in: ${error.message}`)
    throw error
  }
}
