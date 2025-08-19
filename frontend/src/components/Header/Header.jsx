import "./Header.scss"

// 👉 FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

// 👉 Internal components
import BurgerMenu from "../BurgerMenu/BurgerMenu"
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"

// 👉 Redux hooks
import { useSelector } from "react-redux"

// 👉 i18n
import { useTranslation } from "react-i18next"

/**
 * Header component for the application.
 * Displays the logo, title, subtitle, user information, role icon,
 * language switcher, and burger menu for navigation.
 *
 * @component
 * @returns {JSX.Element} Rendered Header component
 */
const Header = () => {
  // Get user information from Redux store
  const user = useSelector((state) => state.user)

  // Translation function from react-i18next
  const { t } = useTranslation()

  return (
    <header>
      {/* Burger menu for navigation */}
      <BurgerMenu />

      {/* Center section with logo, main title, and subtitle */}
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

      {/* Right section with language switcher, user name, and role */}
      <div className="header__right">
        <div className="header__right-language-switcher">
          <LanguageSwitcher />
        </div>

        {/* Display user full name */}
        <div className="header__right-userName">
          {user.firstName} {user.lastName}
        </div>

        {/* Display user role with icon if role exists */}
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
