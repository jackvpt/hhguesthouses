import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userId: null,
  firstName: null,
  lastName: null,
  email: null,
  codeName: null,
  role: null,
  settings: { preferredLanguage: "en" },
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
      state.codeName = action.payload.codeName
      state.role = action.payload.role
      state.settings = action.payload.settings
    },
    clearUser: () => {
      return { ...initialState }
    },
    setPreferredLanguage: (state, action) => {
      state.settings.preferredLanguage = action.payload
    },
  },
})

export const { setUser, clearUser, setPreferredLanguage } = userSlice.actions

export default userSlice.reducer
