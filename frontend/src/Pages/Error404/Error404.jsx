// 📁 CSS imports
import "./Error404.scss"

// 🌍 Library imports
import { useTranslation } from "react-i18next"

// 🧩 MUI Core imports
import { Button } from "@mui/material"

// 📦 React imports
import { useNavigate } from "react-router-dom"

/**
 * Error404 component to display a 404 error page
 *
 * Shows an error message, the 404 code, and a button to return to the homepage.
 *
 * @component
 * @returns {JSX.Element} The 404 error page
 */
const Error404 = () => {
  // Translation module
  const { t } = useTranslation()
  
  const navigate = useNavigate() 

  return (
    <section className="error">
      {/* Main error message */}
      <p className="error__message">{t("messages.page-not-found")}</p>

      {/* Error code */}
      <h1 className="error__title">404</h1>

      {/* Secondary messages */}
      <p className="error__message">{t("messages.oops")}</p>
      <p className="error__message">{t("messages.sorry")}</p>

      {/* Button to go back to the homepage */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/display")}
      >
        {t("messages.go-to-homepage")}
      </Button>
    </section>
  )
}

export default Error404
