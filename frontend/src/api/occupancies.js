export const fetchAllOccupancies = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/occupancies")
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

