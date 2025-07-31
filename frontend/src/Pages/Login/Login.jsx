import "./Login.scss"
import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { login } from "../../api/auth"
import { useDispatch } from "react-redux"
import { setUser } from "../../features/userSlice"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
  const [toast, setToast] = useState({ message: "", severity: "success" })
  const [toastOpen, setToastOpen] = useState(false)

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

    loginMutation.mutate(formData)

    //Reset form data after submission
    setFormData({
      email: "",
      password: "",
    })
  }

  /**
   * Mutation to log in.
   */
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token)
      console.log("data :>> ", data)

      dispatch(
        setUser({
          userId: data.userId,
          firstName: data.firstName,
          lastName: data.lastName,
          codeName: data.codeName,
          role: data.role,
        })
      )
      showToast(`Login successful. Welcome ${data.firstName}!`)
      navigate("/display")
    },
    onError: (error) => {
      console.error("Error while logging in:", error)
    },
  })

  const showToast = (message, severity = "success") => {
    setToast({ message, severity })
    setToastOpen(true)
  }

  /**
   * Close the success toast notification.
   * @param {Event} event
   * @param {string} reason
   */
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") return
    setToastOpen(false)
  }

  return (
    <section className="login">
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setFormData({email:"jacques.verpoest@heliholland.nl",password:"Guesthouses.1"})}
        >
          JVP superAdmin
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setFormData({email:"jp.gallot@heliholland.nl",password:"Guesthouses.1"})}
        >
          JPG admin
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setFormData({email:"arie.slagter@heliholland.nl",password:"Guesthouses.1"})}
        >
          ARI guest
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setFormData({email:"ian.scott@heliholland.nl",password:"Guesthouses.1"})}
        >
          IAN manager
        </Button>
      </FormControl>
      <h1>LOGIN</h1>
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
        Log in
      </Button>
      <div className="login__noaccount">
        <p>Don't have an account ?</p>
        <p
          className="login__signin"
          onClick={() => {
            navigate("/signup")
          }}
        >
          Sign up
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

export default Login
