import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Display from "../Pages/Display/Display"

/**
 * Application router component using React Router v6.
 *
 * @category Router
 * @component
 * @returns {JSX.Element} The main Router component for the application.
 */
export default function Router() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="*" element={<Display />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
