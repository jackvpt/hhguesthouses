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
      <BurgerMenu />
      <h1>HH Guest Houses</h1>
      <div className="header__right">
        <p>
          {user.firstName} {user.lastName}
        </p>
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
