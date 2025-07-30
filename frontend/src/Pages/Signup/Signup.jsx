import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

import { useUsers } from "../../hooks/useUsers"
import "./Signup.scss"
import { useState } from "react"

const Signup = () => {
  // React Query: Fetch users
  const { data: users, isLoadingUsers, errorUsers } = useUsers()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    codeName: "",
    email: "",
    password: "",
  })
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [showPassword, setShowPassword] = useState(false)

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
    return true
  }

  if (isLoadingUsers) return <div>Loading users...</div>
  if (errorUsers) return <div>Error loading users: {errorUsers.message}</div>

  return (
    <section className="signup">
      <h1>SIGN UP</h1>
      {/* FIRST NAME */}
      <FormControl fullWidth>
        <TextField
          className="signup__textfield"
          id="first-name"
          name="firstName"
          label="First name"
          variant="outlined"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </FormControl>

      {/* LAST NAME */}
      <FormControl fullWidth>
        <TextField
          className="signup__textfield"
          id="last-name"
          name="lastName"
          label="Last name"
          variant="outlined"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </FormControl>

      {/* CODE NAME */}
      <FormControl fullWidth>
        <TextField
          className="signup__textfield"
          id="code-name"
          name="codeName"
          label="Code name"
          variant="outlined"
          value={formData.codeName}
          onChange={handleInputChange}
          required
          placeholder="Enter 3 letters to code your name"
        />
      </FormControl>

      {/* EMAIL */}
      <FormControl fullWidth>
        <TextField
          className="signup__textfield"
          id="email"
          name="email"
          label="Email"
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
        <InputLabel htmlFor="password" required>
          Password
        </InputLabel>
        <OutlinedInput
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
        disabled={!isFormValid()}
      >
        Sign up
      </Button>
    </section>
  )
}

export default Signup
