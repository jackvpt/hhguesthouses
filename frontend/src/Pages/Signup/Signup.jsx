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

import "./Signup.scss"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signup } from "../../api/auth"

const Signup = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const initialState = {
    firstName: "",
    lastName: "",
    codeName: "",
    role:"guest",
    email: "@heliholland.nl",
    password: "Guesthouses.1",
  }

  const [formData, setFormData] = useState(initialState)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [toast, setToast] = useState({ message: "", severity: "success" })

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleInputBlur = (event) => {
    const { name, value } = event.target
    switch (name) {
      case "email":
        isValidEmail(value)
        break
      case "password":
        isValidPassword(value)
    }
  }

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

  const isValidPassword = (password) => {
    if (!password) {
      setPasswordError("Password is required.")
      return false
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
    if (!passwordRegex.test(password)) {
      setPasswordError("Invalid password format.")
      return false
    }

    setPasswordError("")
    return true
  }

  const isFormValid = () => {
    if (isValidEmail(formData.email) && isValidPassword(formData.password))
      return true
    return false
  }

  const submitForm = () => {
    if (!isFormValid()) {
      return
    }

    signupMutation.mutate(formData)
  }

  /**
   * Mutation to create a new account.
   */
  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries("users")
      showToast("Account created successfully")

      // Reset form data after submission
      setFormData(initialState)
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        showToast("This email is already registered.", "error")
      }
      console.error("Error while creating account:", error)
    },
  })

  /**
   * Close the success toast notification.
   * @param {Event} event
   * @param {string} reason
   */
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") return
    setToastOpen(false)
  }

  const showToast = (message, severity = "success") => {
    setToast({ message, severity })
    setToastOpen(true)
  }

  return (
    <section className="signup">
      <h1>SIGN UP</h1>
      <h2>Create your account</h2>
      {/* FIRST NAME */}
      <FormControl fullWidth>
        <FormLabel htmlFor="first-name" required className="signup__formlabel">
          First name
        </FormLabel>
        <TextField
          sx={{ marginLeft: "10px" }}
          className="signup__textfield"
          id="first-name"
          name="firstName"
          variant="outlined"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </FormControl>

      {/* LAST NAME */}
      <FormControl fullWidth>
        <FormLabel htmlFor="last-name" required className="signup__formlabel">
          Last name
        </FormLabel>

        <TextField
          sx={{ marginLeft: "10px" }}
          className="signup__textfield"
          id="last-name"
          name="lastName"
          variant="outlined"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </FormControl>

      {/* CODE NAME */}
      <FormControl fullWidth>
        <FormLabel htmlFor="code-name" required className="signup__formlabel">
          Code name
        </FormLabel>
        <TextField
          sx={{ marginLeft: "10px" }}
          className="signup__textfield"
          id="code-name"
          name="codeName"
          variant="outlined"
          value={formData.codeName}
          onChange={handleInputChange}
          required
          placeholder="Enter 3 letters to code your name"
        />
      </FormControl>

      {/* ROLE */}
      <FormControl fullWidth>
        <FormLabel htmlFor="role" required className="signup__formlabel">
          Role
        </FormLabel>
        <Select
          sx={{ marginLeft: "10px" }}
          className="signup__select"
          
          id="role"
          name="role"
          variant="outlined"
          value={formData.role}
          onChange={handleInputChange}
          required
        >
          <MenuItem value="guest">Guest</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="super-admin">Super admin</MenuItem>
        </Select>
      </FormControl>

      {/* EMAIL */}
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

      {/* PASSWORD */}
      <FormControl
        fullWidth
        variant="outlined"
        className="signup__outlinedinput"
        error={Boolean(passwordError)}
      >
        <FormLabel htmlFor="password" required className="signup__formlabel">
          Password
        </FormLabel>
        <OutlinedInput
          sx={{ marginLeft: "10px" }}
          id="password"
          aria-describedby="password-helper"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
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
          label="Password"
        />
        <p className="signup__helpertext">
          Must be at least 8 chars, 1 uppercase, 1 lowercase, 1 number & 1
          special character.
        </p>
        {passwordError && <p className="signup__error">{passwordError}</p>}
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={submitForm}
      >
        Create account
      </Button>
      <div className="signup__accountexists">
        <p>Already have an account ?</p>
        <p
          className="signup__login"
          onClick={() => {
            navigate("/login")
          }}
        >
          Log in
        </p>
      </div>
      {/* Toast notification for success messages */}
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
    </section>
  )
}

export default Signup
