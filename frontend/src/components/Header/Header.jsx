import "./Header.scss"
// 👉 FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import BurgerMenu from "../BurgerMenu/BurgerMenu"
import { useSelector } from "react-redux"

const Header = () => {
  const user = useSelector((state) => state.user)

  return (
    <header>
      {user.userId && <BurgerMenu />}
      <div className="header__center">
        <div className="header__center-title">
          <img
            src="/public/logo-hh.png"
            alt="HH Guest Houses Logo"
            className="header__logo"
            width={48}
          />
          <h1>HH Guest Houses</h1>
        </div>
        <h2>Luxury mansions in Den Helder</h2>
      </div>
      <div className="header__right">
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
