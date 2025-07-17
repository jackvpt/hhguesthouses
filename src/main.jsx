import "./styles/_index.scss" 
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Provider } from "react-redux"
import { store } from "./store/store.js"

/**
 * Initializes a new QueryClient instance for React Query.
 * This client is used to manage all queries and mutations within the app.
 */
const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </Provider>
  </StrictMode>
)
