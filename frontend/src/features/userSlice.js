import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userId: null,
  firstName: null,
  lastName: null,
  email: null,
  codeName: null,
  role: null,
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
    },
    clearUser: () => {
      return { ...initialState }
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
