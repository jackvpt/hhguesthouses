import { Button } from "@mui/material"
import "./Error.scss"
import { useTranslation } from "react-i18next"

/**
 * Error component that displays an error message and a reload button.
 *
 * This component can handle either a single error message string or an array of messages.
 * It provides a localized general error message and allows the user to reload the page.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|string[]} props.message - The error message(s) to display.
 * @returns {JSX.Element} Rendered Error component.
 */
const Error = ({ message }) => {
  const { t } = useTranslation() // Hook for i18n translations

  return (
    <section className="error">
      {/* Modal wrapper */}
      <div className="error__modal">
        {/* General error message */}
        <div className="error__modal-message">
          {t("messages.something-went-wrong")}
        </div>

        {/* Specific error details */}
        <div className="error__modal-text">
          {Array.isArray(message)
            ? message.map((line, index) => <p key={index}>{line}</p>) // Render each message line if array
            : <p>{message}</p>} {/* Render single message string */}
        </div>

        {/* Reload button */}
        <Button
          className="error__modal-button"
          variant="contained"
          color="primary"
          sx={{ marginTop: "1.5rem", padding: "0.8rem 1rem" }}
          onClick={() => window.location.reload()} // Reload the page when clicked
        >
          Reload page
        </Button>
      </div>
    </section>
  )
}

export default Error
