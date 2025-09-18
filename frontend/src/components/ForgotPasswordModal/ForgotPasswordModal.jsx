// 📁 CSS imports
import "./ForgotPasswordModal.scss"

// 🌍 Library imports
import { useTranslation } from "react-i18next"

// 📦 React imports
import { useState } from "react"

// 🧩 MUI Core imports
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material"
import { useRequestPasswordReset } from "../../hooks/useRequestPasswordReset"

/**
 * Contact form modal component
 * @param {Object} param - Component props
 * @param {boolean} param.open - Modal open state
 * @param {function} param.onClose - Function to call on modal close
 * @returns {JSX.Element|null} Rendered modal or null
 */
const ForgotPasswordModal = ({ open, onClose }) => {
  // Translation module
  const { t } = useTranslation()

  // Form state
  const [formData, setFormData] = useState({
    email: "",
  })

  // States
  const [isFormValid, setIsFormValid] = useState(false)
  const [emailError, setEmailError] = useState("") // Email validation error
  const [messageStatus, setMessageStatus] = useState({
    message: "",
    severity: "success",
  }) // Alert message state
  const [isSending, setIsSending] = useState(false)

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
    if (name === "email") isEmailValid(value)
    validForm()
  }

  /**
   * React Query: Request password reset mutation
   */
  const requestPasswordResetMutation = useRequestPasswordReset({
    onSuccess: () => {
      setMessageStatus({
        message: t("contact.message-sent"),
        severity: "success",
      })
      setFormData({ email: "" })
      setIsFormValid(false)
      setIsSending(false)
    },
    onError: (error) => {
      console.error(error)
      setMessageStatus({
        message: t("forgot-password.message-failed"),
        severity: "error",
      })
      setIsSending(false)
    },
  })

  /**
   * Handles sending the email via EmailJS
   * @returns {Promise<void>}
   */
  const handleSendEmail = async () => {
    if (!isFormValid) {
      return
    }

    // Indicate sending state for circular icon
    setIsSending(true)

    // Show sending message
    setMessageStatus({
      message: t("forgot-password.message-sending"),
      severity: "info",
    })

    requestPasswordResetMutation.mutate({ email: formData.email })
  }

  /**
   * Validate email format
   * @param {string} email
   * @returns {boolean} True if valid, false otherwise
   */
  const isEmailValid = (email) => {
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
   * Validate the entire form
   */
  const validForm = () => {
    // Check if all fields are filled and email is valid
    const isValid = isEmailValid(formData.email)

    setIsFormValid(isValid)
  }

  // Handle modal close
  const handleCancel = () => {
    setMessageStatus({ message: "", severity: "success" })
    onClose()
  }

  if (!open) return null

  return (
    <section className="forgotPassword">
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            margin: "12px",
            width: "100%",
          },
        }}
      >
        {/* Modal title */}
        <DialogTitle>{t("forgot-password.title")}</DialogTitle>
        <DialogContent>
          {/* FIRST NAME FIELD */}
          <Stack spacing={3}>
            <p>{t("forgot-password.instructions")}</p>
            {/* EMAIL FIELD */}
            <FormControl fullWidth>
              <FormLabel htmlFor="email" required className="signup__formlabel">
                Email
              </FormLabel>
              <TextField
                sx={{ marginLeft: "10px" }}
                className="forgotPassword__formlabel"
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
          </Stack>
        </DialogContent>

        {/* Buttons */}
        <div className="forgotPassword__buttons">
          <DialogActions>
            {/** Cancel button */}
            <Button
              className="btn_cancel"
              sx={{ m: 1, minWidth: 120 }}
              variant="contained"
              onClick={handleCancel}
            >
              {t("actions.cancel")}
            </Button>

            {/** Reset button */}
            <Button
              className="btn_resetPassword"
              sx={{ m: 1, minWidth: 120 }}
              variant="contained"
              onClick={handleSendEmail}
              disabled={!isFormValid || isSending}
            >
              {isSending ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                t("actions.reset-password")
              )}
            </Button>
          </DialogActions>
        </div>

        <div className="forgotPassword__status">
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
      </Dialog>
    </section>
  )
}

export default ForgotPasswordModal
