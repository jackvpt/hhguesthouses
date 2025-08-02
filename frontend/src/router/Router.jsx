import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Display from "../Pages/Display/Display"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import Signup from "../Pages/Signup/Signup"
import Error from "../Pages/Error/Error"
import Login from "../Pages/Login/Login"

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
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="display" element={<Display />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
