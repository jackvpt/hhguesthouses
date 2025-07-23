import axios from "axios"

const BASE_URL = "http://localhost:3000/api/occupancies"

export const fetchAllOccupancies = async () => {
  try {
    const response = await fetch(BASE_URL)
    if (!response.ok) throw new Error("API request failed")
    const data = await response.json()
    return data
  } catch (error) {
    console.error(
      `Error fetching occupancy data from API: ${error.message}`
    )
    throw error
  }
}

export const postOccupancy = async (occupancyData) => {
  try {
    console.log('occupancyData :>> ', occupancyData);
    const { data } = await axios.post(BASE_URL, occupancyData)
    return data
  } catch (error) {
    console.error("Error posting occupancy:", error.message)
    throw error
  }
}

export const deleteOccupancy = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting occupancy :", error.message);
    throw error;
  }
};