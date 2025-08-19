// userSlice.js
import { createSlice } from "@reduxjs/toolkit"

/**
 * Initial state of the user slice
 */
const initialState = {
  userId: null,
  firstName: null,
  lastName: null,
  email: null,
  codeName: null,
  role: null,
  settings: {
    preferredLanguage: "en", // Default language
  },
}

/**
 * Redux slice for user information and settings
 *
 * Handles storing user data, clearing user state, and updating user settings.
 */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Set the user information
     * @param {object} action.payload - User data object
     * @param {string|number} action.payload.userId - User ID
     * @param {string} action.payload.firstName - First name
     * @param {string} action.payload.lastName - Last name
     * @param {string} action.payload.email - Email address
     * @param {string} action.payload.codeName - Code name
     * @param {string} action.payload.role - User role
     * @param {object} action.payload.settings - User settings
     */
    setUser: (state, action) => {
      state.userId = action.payload.userId
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
      state.codeName = action.payload.codeName
      state.role = action.payload.role
      state.settings = action.payload.settings
    },

    /**
     * Clear all user data and reset to initial state
     */
    clearUser: () => {
      return { ...initialState }
    },

    /**
     * Update the user's preferred language
     * @param {string} action.payload - Language code (e.g., 'en', 'fr')
     */
    setPreferredLanguage: (state, action) => {
      state.settings.preferredLanguage = action.payload
    },
  },
})

// Export actions for dispatch
export const { setUser, clearUser, setPreferredLanguage } = userSlice.actions

// Export reducer for store configuration
export default userSlice.reducer
