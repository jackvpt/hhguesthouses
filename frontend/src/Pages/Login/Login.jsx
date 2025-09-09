// 📁 CSS imports
import "./Login.scss"

// 🌍 Library imports
import { useTranslation } from "react-i18next"

// 🧩 MUI Core imports
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

// 📦 React imports
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

// 🌐 React Query
import { useMutation } from "@tanstack/react-query"

// 🧰 API functions
import { login } from "../../api/auth"

// 🗃️ State & Data fetching
import { setLanguage } from "../../features/parametersSlice"

// 👉 Internal components
import ContactFormModal from "../../components/ContactFormModal/ContactFormModal"
import ForgotPasswordModal from "../../components/ForgotPasswordModal/ForgotPasswordModal"

/**
 * Login component
 *
 * Handles user login with email and password,
 * displays errors and success notifications,
 * and updates user info in Redux store.
 *
 * @component
 * @returns {JSX.Element} Login form
 */
const Login = () => {
  const navigate = useNavigate() // Hook to redirect the user
  const dispatch = useDispatch() // Hook to dispatch Redux actions
  const { t } = useTranslation() // Hook for translations

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    codeName: "",
    email: "",
    password: "",
  })

  // States
  const [emailError, setEmailError] = useState("") // Email validation error
  const [showPassword, setShowPassword] = useState(false) // Toggle password visibility
  const [toast, setToast] = useState({ message: "", severity: "success" }) // Toast message state
  const [toastOpen, setToastOpen] = useState(false) // Toast visibility
  const [loginError, setLoginError] = useState(false) // Login failure indicator
  const [rememberMe, setRememberMe] = useState(false) // Remember me checkbox
  const [contactFormModalOpen, setContactFormModalOpen] = useState(false)
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false)

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Validate input on blur
  const handleInputBlur = (event) => {
    const { name, value } = event.target
    if (name === "email") isValidEmail(value)
  }

  /**
   * Validate email format
   * @param {string} email
   * @returns {boolean} True if valid, false otherwise
   */
  const isValidEmail = (email) => {
    if (!email) {
      setEmailError("Email is required.")
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format.")
      return false
    }
    setEmailError("")
    return true
  }

  /**
   * Check if the form is valid
   * @returns {boolean} True if valid
   */
  const isFormValid = () => isValidEmail(formData.email)

  /**
   * Submit the login form
   */
  const submitForm = () => {
    if (!isFormValid()) return
    setLoginError(false)
    loginMutation.mutate(formData)
  }

  /**
   * Mutation to log in the user via API
   */
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Show success toast
      showToast(
        `${t("login.login-successfull")}. ${t("common-words.welcome")} ${
          data.firstName
        }!`
      )

      // Save token in sessionStorage or localStorage if "remember me" is checked
      sessionStorage.setItem("token", data.token)
      if (rememberMe) localStorage.setItem("token", data.token)

      // Update Redux user state
      dispatch({
        type: "user/setUser",
        payload: {
          userId: data.userId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          codeName: data.codeName,
          role: data.role,
          settings: data.settings,
        },
      })
      const language = data.settings.preferredLanguage
      dispatch(setLanguage(language))
      localStorage.setItem("language", language)

      // Reset form
      setFormData({
        email: "",
        password: "",
      })

      navigate("/display") // Redirect to main page
    },
    onError: (error) => {
      console.error("Error while logging in:", error)
      if (error.message === "UserID/Password incorrect") setLoginError(true)
    },
  })

  /**
   * Display a toast notification
   * @param {string} message
   * @param {("success"|"error"|"info"|"warning")} severity
   */
  const showToast = (message, severity = "success") => {
    setToast({ message, severity })
    setToastOpen(true)
  }

  /**
   * Close the toast notification
   * @param {Event} event
   * @param {string} reason
   */
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") return
    setToastOpen(false)
  }

  return (
    <section className="login">
      <h1>LOGIN</h1>

      {/* EMAIL FIELD */}
      <FormControl fullWidth>
        <FormLabel htmlFor="email" required className="signup__formlabel">
          Email
        </FormLabel>
        <TextField
          sx={{ marginLeft: "10px" }}
          className="signup__textfield"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          variant="outlined"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          required
          error={Boolean(emailError)}
          helperText={emailError}
        />
      </FormControl>

      {/* PASSWORD FIELD */}
      <FormControl
        fullWidth
        variant="outlined"
        className="signup__outlinedinput"
      >
        <FormLabel htmlFor="password" required className="signup__formlabel">
          {t("login.password")}
        </FormLabel>
        <OutlinedInput
          sx={{ marginLeft: "10px" }}
          id="password"
          aria-describedby="password-helper"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleInputChange}
          required
          autoComplete="new-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                className="toggle-password-visibility"
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <div className="login__forgotten-password">
        <button
          type="button"
          className="login__link"
          onClick={() => setForgotPasswordModalOpen(true)}
        >
          {t("login.forgot-password")}
        </button>
      </div>

      {/* LOGIN BUTTON */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={submitForm}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Log in"
        )}
      </Button>

      {/* REMEMBER ME CHECKBOX */}
      <FormControlLabel
        className="login__checkbox"
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            size="small"
          />
        }
        label={t("login.remember-me")}
        sx={{
          alignItems: "center",
          "& .MuiFormControlLabel-label": {
            display: "flex",
            alignItems: "center",
            lineHeight: 1.2,
          },
        }}
      />

      {/** NO ACCOUNT LINK */}
      <div className="login__noaccount">
        <p>{t("login.no-account")}</p>
        <button
          type="button"
          className="login__link"
          onClick={() => setContactFormModalOpen(true)}
        >
          {t("login.contact-admin")}
        </button>
      </div>

      {/* LOGIN ERROR MESSAGE */}
      {loginError && (
        <Alert className="login__error" severity="error" sx={{ width: "100%" }}>
          {t("login.password-incorrect")}
        </Alert>
      )}

      {/* SUCCESS TOAST */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleToastClose}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>

      {/** CONTACT FORM MODAL */}
      <ContactFormModal
        open={contactFormModalOpen}
        onClose={() => setContactFormModalOpen(false)}
      />

      {/** FORGOT PASSWORD MODAL */}
      <ForgotPasswordModal
        open={forgotPasswordModalOpen}
        onClose={() => setForgotPasswordModalOpen(false)}
      />
    </section>
  )
}

export default Login
