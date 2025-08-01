import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // localStorage par défaut

import parametersSlice from "../features/parametersSlice"
import userSlice from "../features/userSlice"

// 🗂️ 1️⃣ Combine tes reducers
const rootReducer = combineReducers({
  parameters: parametersSlice,
  user: userSlice,
})

// 🗝️ 2️⃣ Configure le persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["parameters", "user"], // Seul 'user' est persistant, 'parameters' reste volatile
}

// 🔄 3️⃣ Crée le reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer)

// ⚙️ 4️⃣ Configure le store RTK
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Important pour éviter les warnings redux-persist
    }),
})

// 🔑 5️⃣ Crée le persistor
export const persistor = persistStore(store)
