import "./Header.scss"
import logo from "../../assets/images/house.png"
import BurgerMenu from "../BurgerMenu/BurgerMenu"

const Header = () => {
  return (
    <header>
      <BurgerMenu />
      <h1>HH Guest Houses</h1>
      <img src={logo} alt="HH Guest Houses Logo" width={32} />
    </header>
  )
}

export default Header
