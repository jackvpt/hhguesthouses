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

  const [emailError, setEmailError] = useState("") // Email validation error

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

  const handleSendEmail = async () => {
    if (!isValidEmail(formData.email)) {
      return
    }

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

      if (response.text != "OK") throw new Error("Error while sending email")

      console.log("Message sent successfully", formData)

      setFormData({ firstName: "", lastName: "", email: "", message: "" })
    } catch (error) {
      console.error(error)
    }
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
              onClick={onClose}
            >
              {t("actions.close")}
            </Button>
            <Button
              className="btn_send"
              sx={{ m: 1, minWidth: 120 }}
              variant="contained"
              onClick={handleSendEmail}
            >
              {t("actions.send")}
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </section>
  )
}

export default ContactFormModal
