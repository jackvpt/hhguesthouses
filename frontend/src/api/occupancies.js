import axios from "axios"

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export const fetchAllOccupancies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/occupancies`)
    return response.data
  } catch (error) {
    console.error(`Error fetching occupancy data from API: ${error.message}`)
    throw error
  }
}

export const postOccupancy = async (occupancyData) => {
  try {
    const { data } = await axios.post(BASE_URL, occupancyData)
    return data
  } catch (error) {
    console.error("Error posting occupancy:", error.message)
    throw error
  }
}

export const deleteOccupancy = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error("Error deleting occupancy :", error.message)
    throw error
  }
}

export const updateOccupancy = async ({ id, updatedData }) => {
  try {
    const { data } = await axios.put(`${BASE_URL}/${id}`, updatedData)
    return data
  } catch (error) {
    console.error("Error updating occupancy:", error.message)
    throw error
  }
}
