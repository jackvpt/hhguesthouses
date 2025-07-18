import "./Header.scss"
import menu from "../../assets/images/menu.png"
import logo from "../../assets/images/house.png"

const Header = () => {
  return (
    <header>
      <img src={menu} alt="Menu" width={26} />
      <h1>HH Guest Houses</h1>
      <img src={logo} alt="HH Guest Houses Logo" width={32} />
    </header>
  )
}

export default Header
