import axios from "axios"

import { API_URL } from "./apiURL"

const BASE_URL = `${API_URL}/occupancies`

export const fetchAllOccupancies = async () => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error(`Error fetching occupancy data from API: ${error.message}`)
    throw error
  }
}

export const postOccupancy = async (occupancyData) => {
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token")

    const { data } = await axios.post(BASE_URL, occupancyData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    return data
  } catch (error) {
    console.error("Error posting occupancy:", error.message)
    throw error
  }
}

export const deleteOccupancy = async (id) => {
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token")

    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error deleting occupancy :", error.message)
    throw error
  }
}

export const updateOccupancy = async ({ id, updatedData }) => {
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
    console.error("Error updating occupancy:", error.message)
    throw error
  }
}
