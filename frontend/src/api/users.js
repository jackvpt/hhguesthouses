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

export const updateUser = async ({ id, updatedData }) => {
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token")

    const { data } = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    return data
  } catch (error) {
    console.error("Error updating user:", error.message)
    throw error
  }
}