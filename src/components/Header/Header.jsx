import "./Header.css";
import logo from "../../assets/logo-white.svg";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="NewsExplorer logo" />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
