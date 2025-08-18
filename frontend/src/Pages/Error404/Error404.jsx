import { Button } from "@mui/material"
import "./Error404.scss"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Error404 = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <section className="error">
      <p className="error__message">{t("messages.page-not-found")}</p>
      <h1 className="error__title">404</h1>
      <p className="error__message">{t("messages.oops")}</p>
      <p className="error__message">{t("messages.sorry")}</p>
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
