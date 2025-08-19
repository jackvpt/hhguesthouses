// 👉 i18n translation hook
import { useTranslation } from "react-i18next"

// 👉 Component-specific SCSS
import "./Loader.scss"

/**
 * Loader component displaying a loading animation.
 * Uses a modal overlay with a spinner and localized loading text.
 *
 * @component
 * @returns {JSX.Element} Rendered Loader component
 */
const Loader = () => {
  // i18n translation function
  const { t } = useTranslation()

  return (
    <section className="loader">
      {/* Modal overlay */}
      <div className="loader__modal">
        <div className="loader__container">
          {/* Spinner animation */}
          <div className="loader__spinner"></div>

          {/* Loading text */}
          <div className="loader__text">
            {t("actions.loading")}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Loader
