// 📦 React imports
import { Routes, Route, Navigate } from "react-router-dom"

// 🗃️ State & Data fetching
import { useSelector } from "react-redux"

// 👉 Internal pages
import Display from "../Pages/Display/Display"
import Signup from "../Pages/Signup/Signup"
import Login from "../Pages/Login/Login"
import Error404 from "../Pages/Error404/Error404"
import Account from "../Pages/Account/Account"

// 👉 Internal components
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import ResetPassword from "../Pages/ResetPassword/ResetPassword"

/**
 * Application Router Component
 *
 * Manages routing of the application using React Router v6.
 * Routes are protected based on authentication status:
 * - If the user is not authenticated, they are redirected to the login page.
 * - If the user is authenticated, they can access the main application pages.
 *
 * @component
 * @category Router
 * @returns {JSX.Element} The main Router component for the application.
 */
export default function Router() {
  // Access Redux state to determine if a user is authenticated
  const isAuthenticated = useSelector((state) => state.user.userId !== null)

  return (
    <>
      {/* Header displayed on all pages */}
      <Header />

      <main>
        <Routes>
          {/* Reset Password Route */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Routes for unauthenticated users */}
          {!isAuthenticated ? (
            <>
              {/* Login page route */}
              <Route path="/login" element={<Login />} />

              {/* Redirect any unknown route to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              {/* Routes for authenticated users */}
              <Route path="/" element={<Display />} />
              <Route path="/display" element={<Display />} />
              <Route path="/account" element={<Account />} />

              {/* Allow admin/user to signup or login if needed */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              {/* Catch-all route for unknown paths */}
              <Route path="*" element={<Error404 />} />
            </>
          )}
        </Routes>
      </main>

      {/* Footer displayed on all pages */}
      <Footer />
    </>
  )
}
