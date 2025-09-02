import "./Account.scss"

import { useTranslation } from "react-i18next"
import { useState } from "react"
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material"
import { useSelector } from "react-redux"

// 👉 FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { Navigate, useNavigate } from "react-router-dom"
import { convertRole } from "../../utils/stringTools"
import { Visibility, VisibilityOff } from "@mui/icons-material"

const Account = () => {
  const { t } = useTranslation()
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  // Form state
  const [formData, setFormData] = useState({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    codeName: user.codeName,
    role: convertRole(user.role),
    password: "",
    confirmPassword: ""
  })

  const [passwordError, setPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  /**
   * Updates form state on input change
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * Toggles password visibility
   */
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  return (
    <section className="account">
      <div className="account__header">
        <div className="account__header__left">
          <IconButton onClick={() => navigate("/display")}>
            <FontAwesomeIcon icon={faHouse} />
          </IconButton>
        </div>
        <h1>{t("account.title").toUpperCase()}</h1>
      </div>

      {/* EMAIL FIELD */}
      <FormControl fullWidth>
        <FormLabel htmlFor="email" className="account__formlabel">
          Email
        </FormLabel>
        <TextField
          className="account__textfield"
          id="email"
          name="email"
          type="email"
          variant="outlined"
          value={formData.email}
          disabled={true}
        />
      </FormControl>

      {/* FIRST NAME FIELD */}
      <FormControl fullWidth>
        <FormLabel htmlFor="firstName" required className="account__formlabel">
          {t("account.first-name")}
        </FormLabel>
        <TextField
          className="account__textfield"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </FormControl>

      {/* LAST NAME FIELD */}
      <FormControl fullWidth>
        <FormLabel htmlFor="lastName" required className="account__formlabel">
          {t("account.last-name")}
        </FormLabel>
        <TextField
          className="account__textfield"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </FormControl>

      {/* CODE NAME FIELD */}
      <FormControl fullWidth>
        <FormLabel htmlFor="codeName" required className="account__formlabel">
          {t("account.code-name")}
        </FormLabel>
        <TextField
          className="account__textfield"
          id="codeName"
          name="codeName"
          value={formData.codeName}
          onChange={handleInputChange}
        />
      </FormControl>

      {/* ROLE FIELD */}
      <FormControl fullWidth>
        <FormLabel htmlFor="role" className="account__formlabel">
          {t("account.role")}
        </FormLabel>
        <TextField
          className="account__textfield"
          id="role"
          name="role"
          value={formData.role}
          disabled={true}
        />
      </FormControl>

      {/* CHANGE PASSWORD BOX */}
      <Box
        sx={{
          border: "1px solid",
          borderColor: "grey.300",
          borderRadius: 2,
          p: 2,
          width: "100%",
          position: "relative",
        }}
      >
        {/* Caption */}
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: -10,
            left: 12,
            backgroundColor: "background.paper",
            px: 0.5,
          }}
        >
          {t("account.change-password")}
        </Typography>

        {/* NEW PASSWORD FIELD */}
        <FormControl fullWidth>
          <FormLabel
            htmlFor="newPassword"
            required
            className="account__formlabel"
          >
            {t("account.new-password")}
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

        {/* CONFIRM PASSWORD FIELD */}
        <FormControl fullWidth>
          <FormLabel
            htmlFor="confirmPassword"
            required
            className="account__formlabel"
          >
            {t("account.confirm-password")}
          </FormLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
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
      </Box>
    </section>
  )
}

export default Account
