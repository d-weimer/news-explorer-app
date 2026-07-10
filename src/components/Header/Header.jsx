import "./Header.css";
import logo from "../../assets/logo-white.svg";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="NewsExplorer logo" />
        <nav className="header__nav">
          <p className="header__home header__link_active">Home</p>
          <button className="header__sign-in-button">Sign In</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
