import { Button } from "@mui/material"
import "./Error.scss"
import { useTranslation } from "react-i18next"

/**
 * Error component displaying an error message with an optional reload button.
 *
 * @component
 * @param {Object} props
 * @param {string|string[]} props.message - The error message(s) to display.
 * @returns {JSX.Element} The Error component.
 */

const Error = ({ message }) => {
  const { t } = useTranslation()

  return (
    <section className="error">
      <div className="error__modal">
        <div className="error__modal-message">
          {t("messages.something-went-wrong")}
        </div>
        <div className="error__modal-text">
          {Array.isArray(message) ? (
            message.map((line, index) => <p key={index}>{line}</p>)
          ) : (
            <p>{message}</p>
          )}
        </div>
        <Button
          className="error__modal-button"
          variant="contained"
          color="primary"
          sx={{ marginTop: "1.5rem", padding: "0.8rem 1rem" }}
          onClick={() => window.location.reload()}
        >
          Reload page
        </Button>
      </div>
    </section>
  )
}

export default Error
