import { configureStore } from "@reduxjs/toolkit"
import parametersSlice from "../features/parametersSlice"
import userSlice from "../features/userSlice"

export const store = configureStore({
  reducer: {
    parameters: parametersSlice,
    user: userSlice,
  },
})
