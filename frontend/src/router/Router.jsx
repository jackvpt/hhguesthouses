import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Display from "../Pages/Display/Display"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import Signup from "../Pages/Signup/Signup"
import Login from "../Pages/Login/Login"
import { useDispatch, useSelector } from "react-redux"
import Error404 from "../Pages/Error404/Error404"
import { clearUser } from "../features/userSlice"

/**
 * Application router component using React Router v6.
 *
 * @category Router
 * @component
 * @returns {JSX.Element} The main Router component for the application.
 */
export default function Router() {
  const dispatch = useDispatch()

  const token = localStorage.getItem("token") || sessionStorage.getItem("token")
  if (!token) {
    dispatch(clearUser())
  }

  const isAuthenticated = useSelector((state) => state.user.userId !== null)

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Display />} />
              <Route path="/display" element={<Display />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Error404 />} />
            </>
          )}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
