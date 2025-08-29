import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useState } from "react"

import "./Signup.scss"
import { useSignUp } from "../../hooks/useSignUp"

/**
 * Signup Component
 * Handles user registration with field validation
 * and displays notifications via toasts.
 */
const Signup = () => {
  /** Initial form state */
  const initialState = {
    firstName: "",
    lastName: "",
    codeName: "",
    role: "guest",
    email: "@heliholland.nl",
    password: "Guesthouses.1",
  }

  // --- STATES ---
  const [formData, setFormData] = useState(initialState)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [toast, setToast] = useState({ message: "", severity: "success" })

  /**
   * Toggles password visibility
   */
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  /**
   * Updates form state on input change
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
   * Validates email format
   * @param {string} email
   * @returns {boolean}
   */
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email)

  /**
   * Validates password complexity (example)
   * @param {string} password
   * @returns {boolean}
   */
  const validatePassword = (password) =>
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)

  // --- React Query mutation for signup ---
  const signupMutation = useSignUp({
    onSuccess: () => {
      setToast("User added successfully")
      setToastOpen(true)
      setTimeout(() => {}, 2000)
    },
    onError: (error) => {
      console.error("Error adding user:", error)
    },
  })

  /**
   * Handles form submission
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    // --- Validation ---
    let valid = true
    if (!validateEmail(formData.email)) {
      setEmailError("Invalid email format")
      valid = false
    } else setEmailError("")

    if (!validatePassword(formData.password)) {
      setPasswordError(
        "Password must be at least 8 characters, include a number and a capital letter"
      )
      valid = false
    } else setPasswordError("")

    if (!valid) return

    // --- Call signup API ---
    signupMutation.mutate(formData)
  }

  return (
    <section className="signup">
      <h1>SIGN UP</h1>
      {/* FIRST NAME FIELD */}
      <FormControl fullWidth>
        <FormLabel htmlFor="firstName" required className="signup__formlabel">
          First name
        </FormLabel>
        <TextField
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </FormControl>

      {/* LAST NAME FIELD */}
      <FormControl fullWidth>
        <FormLabel htmlFor="lastName" required className="signup__formlabel">
          Last name
        </FormLabel>
        <TextField
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </FormControl>

      {/* CODE NAME FIELD */}
      <FormControl fullWidth>
        <FormLabel htmlFor="codeName" required className="signup__formlabel">
          Code name
        </FormLabel>
        <TextField
          id="codeName"
          name="codeName"
          value={formData.codeName}
          onChange={handleInputChange}
        />
      </FormControl>

      {/* ROLE FIELD */}
      <FormControl fullWidth>
        <FormLabel htmlFor="codeName" required className="signup__formlabel">
          Role
        </FormLabel>
        <Select name="role" value={formData.role} onChange={handleInputChange}>
          <MenuItem value="guest">Guest</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>

      {/* EMAIL FIELD */}
      <FormControl fullWidth>
        <FormLabel htmlFor="email" required className="signup__formlabel">
          Email
        </FormLabel>
        <TextField
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
      <FormControl fullWidth>
        <FormLabel htmlFor="codeName" required className="signup__formlabel">
          Password
        </FormLabel>
        <OutlinedInput
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          error={!!passwordError}
          required
        />
        {passwordError && <span className="error-text">{passwordError}</span>}
      </FormControl>

      <Button onClick={handleSubmit} variant="contained" color="primary">
        Sign Up
      </Button>
      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        onClose={() => setToastOpen(false)}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </section>
  )
}

export default Signup
