import "./Header.scss"
// 👉 FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import BurgerMenu from "../BurgerMenu/BurgerMenu"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"

const Header = () => {
  const user = useSelector((state) => state.user)

  const { t } = useTranslation()

  return (
    <header>
      <BurgerMenu />
      <div className="header__center">
        <div className="header__center-title">
          <img
            src="/logo-hh.png"
            alt="HH Guest Houses Logo"
            className="header__logo"
            width={48}
          />
          <h1>GUEST HOUSES</h1>
        </div>
        <h2>{t("messages.luxury-mansions")}</h2>
      </div>
      <div className="header__right">
        <div className="header__right-language-switcher">
          <LanguageSwitcher />
        </div>
        <div className="header__right-userName">
          {user.firstName} {user.lastName}
        </div>
        {user.role && (
          <div className={`header__right-role ${user.role}`}>
            <FontAwesomeIcon className={user.role} icon={faUser} size="lg" />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
