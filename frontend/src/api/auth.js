import axios from "axios"
import { API_URL } from "./apiURL"

const BASE_URL = API_URL

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
  const token = localStorage.getItem("token")
  if (!token) throw new Error("No token found")

  try {
    const response = await axios.get(`${BASE_URL}/validate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    // Si on arrive ici, la requête a réussi
    console.log("response.data :>> ", response.data)
    return response.data
  } catch (error) {
    console.log(error)
    // On peut personnaliser le message d'erreur ou re-throw
    if (axios.isAxiosError(error)) {
      // Par exemple, erreur 401 = token invalide
      if (error.response?.status === 401) {
        throw new Error("Token invalide ou expiré")
      }
      // Autres erreurs API
      throw new Error(
        error.response?.data?.message || "Erreur lors de la validation du token"
      )
    }
    // Erreur hors Axios (ex: réseau)
    throw error
  }
}
