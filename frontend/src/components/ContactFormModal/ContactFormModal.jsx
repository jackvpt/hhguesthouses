import "./ContactFormModal.scss"
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
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import emailjs from "@emailjs/browser"

const ContactFormModal = ({ open, onClose }) => {
  const { t } = useTranslation()

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })

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
    validForm()
  }

  // Validate input on blur
  const handleInputBlur = (event) => {
    const { name, value } = event.target
    if (name === "email") isEmailValid(value)
    validForm()
  }

  const handleSendEmail = async () => {
    if (!isFormValid) {
      return
    }

    setIsSending(true)
    setMessageStatus({
      message: t("contact.message-sending"),
      severity: "info",
    })

    try {
      const response = await emailjs.send(
        "service_v3gewzd",
        "template_zebo77i",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          message: formData.message,
        },
        {
          publicKey: "glHT1LLKiJ-mXvYSP",
        }
      )

      if (response.text != "OK") {
        setMessageStatus({
          message: t("contact.message-failed"),
          severity: "error",
        })
        throw new Error("Error while sending email")
      }

      setMessageStatus({
        message: t("contact.message-sent"),
        severity: "success",
      })
      setFormData({ firstName: "", lastName: "", email: "", message: "" })
      setIsFormValid(false)
    } catch (error) {
      console.error(error)
      setMessageStatus({
        message: t("contact.message-failed"),
        severity: "error",
      })
    } finally {
      setIsSending(false)
    }
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

  const validForm = () => {
    const isValid =
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.message.trim() !== "" &&
      isEmailValid(formData.email)

    setIsFormValid(isValid)
  }

  const handleClose = () => {
    setMessageStatus({ message: "", severity: "success" })
    onClose()
  }

  if (!open) return null

  return (
    <section className="contact">
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
        <DialogTitle>{t("contact.title")}</DialogTitle>
        <DialogContent>
          {/* FIRST NAME FIELD */}
          <Stack spacing={3}>
            <FormControl fullWidth>
              <FormLabel
                htmlFor="firstName"
                required
                className="contact__formlabel"
              >
                First name
              </FormLabel>
              <TextField
                id="firstName"
                name="firstName"
                sx={{ marginLeft: "10px" }}
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            {/* LAST NAME FIELD */}
            <FormControl fullWidth>
              <FormLabel
                htmlFor="lastName"
                required
                className="contact__formlabel"
              >
                Last name
              </FormLabel>
              <TextField
                id="lastName"
                name="lastName"
                sx={{ marginLeft: "10px" }}
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            {/* EMAIL FIELD */}
            <FormControl fullWidth>
              <FormLabel htmlFor="email" required className="signup__formlabel">
                Email
              </FormLabel>
              <TextField
                sx={{ marginLeft: "10px" }}
                className="contact__formlabel"
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
            {/* MESSAGE FIELD */}
            <FormControl fullWidth>
              <FormLabel
                htmlFor="message"
                required
                className="signup__formlabel"
              >
                {t("contact.message")}
              </FormLabel>
              <TextField
                sx={{ marginLeft: "10px" }}
                className="contact__formlabel"
                id="message"
                name="message"
                type="text"
                autoComplete="off"
                variant="outlined"
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                required
                multiline
                minRows={4}
                maxRows={8}
              />
            </FormControl>
          </Stack>
        </DialogContent>

        {/* Buttons */}
        <div className="contact__buttons">
          <DialogActions>
            <Button
              className="btn_close"
              sx={{ m: 1, minWidth: 120 }}
              variant="contained"
              onClick={handleClose}
            >
              {t("actions.close")}
            </Button>
            <Button
              className="btn_send"
              sx={{ m: 1, minWidth: 120 }}
              variant="contained"
              onClick={handleSendEmail}
              disabled={!isFormValid || isSending} // désactivé pendant le send
            >
              {isSending ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                t("actions.send")
              )}
            </Button>
          </DialogActions>
        </div>

        <div className="contact__status">
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

export default ContactFormModal
