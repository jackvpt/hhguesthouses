import axios from "axios"
import { API_URL } from "./apiURL"

const BASE_URL = `${API_URL}/auth`

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData)
    return response.data
  } catch (error) {
    console.error(error)
    throw error.response?.data || error
  }
}

export const login = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData)
    return response.data
  } catch (error) {
    console.error(error)
    throw error.response?.data || error
  }
}

export async function validateToken(token) {
  const { data } = await axios.get(`${BASE_URL}/validate`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}
