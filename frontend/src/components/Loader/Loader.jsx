import { useTranslation } from "react-i18next"
import "./Loader.scss"

/**
 * Loader component displaying a loading animation.
 *
 * @component
 * @returns {JSX.Element} The Loader component.
 */
const Loader = () => {
  const { t } = useTranslation()
  return (
    <section className="loader">
      <div className="loader__modal">
        <div className="loader__container">
          <div className="loader__spinner"></div>
          <div className="loader__text">
            {t("actions.loading")}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Loader
