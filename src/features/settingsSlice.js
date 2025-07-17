import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  language: "en",
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    // LANGUAGE
    setLanguage: (state, action) => {
      state.language = action.payload
    },
  },
})

export const {
  setLanguage,
} = settingsSlice.actions

export default settingsSlice.reducer
