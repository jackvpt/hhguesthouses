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
  const [showPassword, setShowPassword] = useState(false)
  const [toast, setToast] = useState({ message: "", severity: "success" })
  const [toastOpen, setToastOpen] = useState(false)
  const [loginError, setLoginError] = useState(false)

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

  const isFormValid = () => {
    if (isValidEmail(formData.email)) return true
    return false
  }

  const submitForm = () => {
    if (!isFormValid()) {
      return
    }
    setLoginError(false)
    loginMutation.mutate(formData)
  }

  /**
   * Mutation to log in.
   */
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      showToast(`Login successful. Welcome ${data.firstName}!`)
      localStorage.setItem("token", data.token)

      dispatch({
        type: "user/setUser",
        payload: {
          userId: data.userId,
          firstName: data.firstName,
          lastName: data.lastName,
          codeName: data.codeName,
          role: data.role,
        },
      })

      //Reset form data after submission
      setFormData({
        email: "",
        password: "",
      })
      
      // Wait for 2 seconds before navigating to the display page
      setTimeout(() => {
        navigate("/display")
      }, 2000)
    },
    onError: (error) => {
      console.error("Error while logging in:", error)
      if (error.message === "UserID/Password incorrect") setLoginError(true)
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
        <p>Don't have an account ? Contact the administrator</p>
        {/* <p
          className="login__signin"
          onClick={() => {
            navigate("/signup")
          }}
        >
          Sign up
        </p> */}
      </div>

      {loginError && (
        <Alert className="login__error" severity="error" sx={{ width: "100%" }}>
          User email and/or password incorrect
        </Alert>
      )}

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
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() =>
            setFormData({
              email: "jacques.verpoest@heliholland.nl",
              password: "Guesthouses.1",
            })
          }
        >
          JVP superAdmin
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() =>
            setFormData({
              email: "jp.gallot@heliholland.nl",
              password: "Guesthouses.1",
            })
          }
        >
          JPG admin
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() =>
            setFormData({
              email: "arie.slagter@heliholland.nl",
              password: "Guesthouses.1",
            })
          }
        >
          ARI guest
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() =>
            setFormData({
              email: "ian.scott@heliholland.nl",
              password: "Guesthouses.1",
            })
          }
        >
          IAN manager
        </Button>
      </FormControl>
    </section>
  )
}

export default Login
