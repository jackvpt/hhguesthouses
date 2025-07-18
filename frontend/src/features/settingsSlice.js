import { createSlice } from "@reduxjs/toolkit"
import { getWeekNumber } from "../utils/dateTools"

const initialState = {
  language: "en",
  weekNumber: getWeekNumber(new Date()),
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    // LANGUAGE
    setLanguage: (state, action) => {
      state.language = action.payload
    },

    // WEEK NUMBER
    setWeekNumber: (state, action) => {
      state.weekNumber = action.payload
    },
  },
})

export const { setLanguage, setWeekNumber } = settingsSlice.actions

export default settingsSlice.reducer
