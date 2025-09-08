// 🗃️ State & Data fetching
import { createSlice } from "@reduxjs/toolkit"

// 🧰 Local utilities
import { getWeekNumber, getWeekRangeFromDate } from "../utils/dateTools"

// Initial reference date for the week calculations
const referenceDate = new Date()
const referenceDateISO = referenceDate.toISOString()

// Initial state of the parameters slice
const initialState = {
  // Week management
  referenceDate: referenceDateISO,
  weekNumber: getWeekNumber(referenceDate),
  weekRange: getWeekRangeFromDate(referenceDate),

  // House editing and occupancy selection
  houseEditMode: null,
  houseEditName: null,
  selectedOccupancy: null,

  // Application language
  language: localStorage.getItem("language") || "nl",
}

/**
 * Redux slice for application parameters
 *
 * Handles week navigation, house editing, occupancy selection, and language.
 */
const parametersSlice = createSlice({
  name: "parameters",
  initialState,
  reducers: {
    /**
     * Set the state to the current week
     */
    currentWeek: (state) => {
      const current = new Date()
      state.referenceDate = current.toISOString()
      state.weekNumber = getWeekNumber(current)
      state.weekRange = getWeekRangeFromDate(current)
    },

    /**
     * Move state to the previous week
     */
    previousWeek: (state) => {
      const current = new Date(state.referenceDate)
      current.setDate(current.getDate() - 7)
      state.referenceDate = current.toISOString()
      state.weekNumber = getWeekNumber(current)
      state.weekRange = getWeekRangeFromDate(current)
    },

    /**
     * Move state to the next week
     */
    nextWeek: (state) => {
      const current = new Date(state.referenceDate)
      current.setDate(current.getDate() + 7)
      state.referenceDate = current.toISOString()
      state.weekNumber = getWeekNumber(current)
      state.weekRange = getWeekRangeFromDate(current)
    },

    /**
     * Set the current house edit mode
     * @param {string} action.payload - mode identifier
     */
    setHouseEditMode: (state, action) => {
      state.houseEditMode = action.payload
    },

    /**
     * Set the name of the house being edited
     * @param {string} action.payload - house name
     */
    setHouseEditName: (state, action) => {
      state.houseEditName = action.payload
    },

    /**
     * Set the currently selected occupancy
     * @param {any} action.payload - occupancy object or ID
     */
    setSelectedOccupancy: (state, action) => {
      state.selectedOccupancy = action.payload
    },

    /**
     * Set the application language
     * @param {string} action.payload - language code (e.g., 'en', 'nl')
     */
    setLanguage: (state, action) => {
      state.language = action.payload
      localStorage.setItem("language", action.payload)
    },

    /**
     * Reset the state to the initial values
     */
    reset: () => initialState,
  },
})

// Export actions for dispatch
export const {
  currentWeek,
  previousWeek,
  nextWeek,
  setHouseEditMode,
  setHouseEditName,
  setSelectedOccupancy,
  setLanguage,
} = parametersSlice.actions

export default parametersSlice.reducer
