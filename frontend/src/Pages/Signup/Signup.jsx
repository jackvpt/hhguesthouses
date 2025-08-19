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
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signup } from "../../api/auth"

import "./Signup.scss"

/**
 * Signup Component
 * Handles user registration with field validation
 * and displays notifications via toasts.
 */
const Signup = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

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
  const signupMutation = useMutation(signup, {
    onSuccess: () => {
      setToast({ message: "Signup successful!", severity: "success" })
      setToastOpen(true)
      queryClient.invalidateQueries(["users"]) // refresh users list
      navigate("/login")
    },
    onError: (error) => {
      setToast({ message: error.message || "Signup failed", severity: "error" })
      setToastOpen(true)
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
    <form className="signup-form" onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Code Name"
        name="codeName"
        value={formData.codeName}
        onChange={handleInputChange}
      />
      <FormControl>
        <FormLabel>Role</FormLabel>
        <Select name="role" value={formData.role} onChange={handleInputChange}>
          <MenuItem value="guest">Guest</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        error={!!emailError}
        helperText={emailError}
        required
      />
      <FormControl variant="outlined">
        <FormLabel>Password</FormLabel>
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
      <Button type="submit" variant="contained" color="primary">
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
    </form>
  )
}

export default Signup
