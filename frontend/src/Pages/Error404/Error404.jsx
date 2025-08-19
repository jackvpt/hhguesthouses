// Import the Button component from Material UI for styled buttons
import { Button } from "@mui/material"

// Import the SCSS file for this page's specific styles
import "./Error404.scss"

// React Router hook to programmatically navigate within the app
import { useNavigate } from "react-router-dom"

// i18n hook to handle translations for different languages
import { useTranslation } from "react-i18next"

/**
 * Error404 component to display a 404 error page
 *
 * Shows an error message, the 404 code, and a button to return to the homepage.
 *
 * @component
 * @returns {JSX.Element} The 404 error page
 */
const Error404 = () => {
  const navigate = useNavigate() // Hook to redirect the user
  const { t } = useTranslation() // Hook for translations

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
