import { createSlice } from "@reduxjs/toolkit"
import { getWeekNumber, getWeekRangeFromDate } from "../utils/dateTools"

const referenceDate = new Date()
const referenceDateISO = referenceDate.toISOString()

const initialState = {
  referenceDate: referenceDateISO,
  weekNumber: getWeekNumber(referenceDate),
  weekRange: getWeekRangeFromDate(referenceDate),

  houseEditMode: null,
  houseEditName: null,
  selectedOccupancy: null,

  language: "nl",
}

const parametersSlice = createSlice({
  name: "parameters",
  initialState,
  reducers: {
    currentWeek: (state) => {
      const current = new Date()
      state.referenceDate = current.toISOString()
      state.weekNumber = getWeekNumber(current)
      state.weekRange = getWeekRangeFromDate(current)
    },
    previousWeek: (state) => {
      const current = new Date(state.referenceDate)
      current.setDate(current.getDate() - 7)
      state.referenceDate = current.toISOString()
      state.weekNumber = getWeekNumber(current)
      state.weekRange = getWeekRangeFromDate(current)
    },
    nextWeek: (state) => {
      const current = new Date(state.referenceDate)
      current.setDate(current.getDate() + 7)

      state.referenceDate = current.toISOString()
      state.weekNumber = getWeekNumber(current)
      state.weekRange = getWeekRangeFromDate(current)
    },

    setHouseEditMode: (state, action) => {
      state.houseEditMode = action.payload
    },
    setHouseEditName: (state, action) => {
      state.houseEditName = action.payload
    },
    setSelectedOccupancy: (state, action) => {
      state.selectedOccupancy = action.payload
    },

    setLanguage: (state, action) => {
      state.language = action.payload
    },

    reset: () => initialState,
  },
})

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
