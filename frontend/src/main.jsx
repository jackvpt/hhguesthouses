import "./styles/_index.scss"
import App from "./App.jsx"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { store, persistor } from "./store/store.js"
import { BrowserRouter } from "react-router-dom"

/**
 * Initializes a new QueryClient instance for React Query.
 * This client is used to manage all queries and mutations within the app.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
      staleTime: 60000, // Data is considered fresh for 1 minute
    },
  },
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
)
