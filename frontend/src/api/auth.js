import axios from "axios"

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth"

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

export const validateToken = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${BASE_URL}/validate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while validating token:", error);
    // Important : rejeter l'erreur pour que useQuery déclenche onError
    throw error;
  }
};

