// 📁 CSS imports
import "./ResetPassword.scss"

// 🌍 Library imports
import { useTranslation } from "react-i18next"

// 🧩 MUI Core imports
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

// 📦 React imports
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useResetPassword } from "../../hooks/useResetPassword"

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
const ResetPassword = () => {
  const { t } = useTranslation() // Hook for translations

  const navigate = useNavigate()

  // Retrieve token from URL parameters
  const { token } = useParams()

  // Form state
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  })

  // States
  const [showPassword, setShowPassword] = useState(false) // Toggle password visibility
  const [newPasswordError, setNewPasswordError] = useState(false)
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [messageStatus, setMessageStatus] = useState({
    message: "",
    severity: "success",
  }) // Alert message state
  const [isResetting, setIsResetting] = useState(false)

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

    let newPasswordErrorState = newPasswordError
    if (!formData.newPassword) newPasswordErrorState = false
    let confirmNewPasswordErrorState = confirmNewPasswordError
    if (!formData.confirmNewPassword) confirmNewPasswordErrorState = false

    if (name === "newPassword") {
      newPasswordErrorState = !validatePassword(value)
      setNewPasswordError(newPasswordErrorState)
    }

    if (name === "confirmNewPassword") {
      confirmNewPasswordErrorState = value !== formData.newPassword
      setConfirmNewPasswordError(confirmNewPasswordErrorState)
    }

    validateForm(formData, newPasswordErrorState, confirmNewPasswordErrorState)
  }

  const validateForm = (
    formData,
    newPasswordError,
    confirmNewPasswordError
  ) => {
    let result = true
    if (!formData.newPassword || newPasswordError) result = false
    if (!formData.confirmNewPassword || confirmNewPasswordError) result = false
    if (formData.newPassword !== formData.confirmNewPassword) result = false

    setIsFormValid(result)
  }

  /**
   * Validates password complexity (example)
   * @param {string} password
   * @returns {boolean}
   */
  const validatePassword = (password) =>
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)

  /**
   * React Query: Request password reset mutation
   */
  const resetPasswordMutation = useResetPassword({
    onSuccess: () => {
      setMessageStatus({
        message: t("reset-password.message-success"),
        severity: "success",
      })
      setFormData({ newPassword: "", confirmNewPassword: "" })
      setIsFormValid(false)
      setIsResetting(false)

      setTimeout(() => {
        navigate("/login")
      }, 3000)
    },
    onError: (error) => {
      console.error(error)
      setMessageStatus({
        message: t("reset-password.message-failed"),
        severity: "error",
      })
      setIsResetting(false)
    },
  })

  const handleResetPassword = () => {
    setIsResetting(true)
    resetPasswordMutation.mutate({
      token,
      newPassword: formData.newPassword,
    })
  }

  return (
    <section className="resetPassword">
      <h1>{t("reset-password.title")}</h1>

      {/* NEW PASSWORD FIELD */}
      <FormControl fullWidth>
        <FormLabel
          htmlFor="newPassword"
          required
          className="account__formlabel"
        >
          {t("reset-password.new-password")}
        </FormLabel>
        <OutlinedInput
          className="account__textfield"
          type={showPassword ? "text" : "password"}
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          error={!!newPasswordError}
          required
          size="small"
        />
        {newPasswordError && (
          <span className="resetPassword__error">
            {t("account.password-requirements")}
          </span>
        )}
      </FormControl>

      {/* CONFIRM PASSWORD FIELD */}
      <FormControl fullWidth>
        <FormLabel
          htmlFor="confirmNewPassword"
          required
          className="account__formlabel"
        >
          {t("reset-password.confirm-password")}
        </FormLabel>
        <OutlinedInput
          className="account__textfield"
          type={showPassword ? "text" : "password"}
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          error={!!confirmNewPasswordError}
          required
          size="small"
        />
        {confirmNewPasswordError && (
          <span className="resetPassword__error">
            {t("reset-password.passwords-do-not-match")}
          </span>
        )}
      </FormControl>

      {/** RESET PASSWORD BUTTON */}
      <Button
        className="resetPassword__buttons"
        onClick={handleResetPassword}
        variant="contained"
        color="primary"
        disabled={!isFormValid}
        sx={{ minWidth: 130 }}
      >
        {isResetting ? (
          <CircularProgress size={18} sx={{ color: "white" }} />
        ) : (
          t("reset-password.title")
        )}
      </Button>

      <div className="resetPassword__status">
        {/* Message status */}
        <Alert
          severity={messageStatus.severity}
          sx={{
            p: 0.5,
            py: 0,
            fontSize: "1rem",
            alignItems: "center",
            lineHeight: 1,
            width: "90%",
            visibility: messageStatus.message ? "visible" : "hidden",
          }}
        >
          {messageStatus.message}
        </Alert>
      </div>
    </section>
  )
}

export default ResetPassword
