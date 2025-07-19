import { configureStore } from "@reduxjs/toolkit"
import parametersSlice from "../features/parametersSlice"

export const store = configureStore({
  reducer: {
    parameters: parametersSlice,
  },
})
