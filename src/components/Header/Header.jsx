import { Link } from "react-router-dom";

import "./Header.css";
import logoWhite from "../../assets/logo-white.svg";
import logoBlack from "../../assets/logo-black.svg";
import Navigation from "../Navigation/Navigation";

function Header({
  isLoggedIn,
  handleLoginClick,
  handleRegisterClick,
  handleLogout,
  currentUser,
}) {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo-link">
          <img
            className="header__logo header__logo_type_white"
            src={logoWhite}
            alt="NewsExplorer logo"
          />
          <img
            className="header__logo header__logo_type_black"
            src={logoBlack}
            alt="NewsExplorer logo"
          />
        </Link>
        <Navigation
          isLoggedIn={isLoggedIn}
          handleLoginClick={handleLoginClick}
          handleRegisterClick={handleRegisterClick}
          handleLogout={handleLogout}
          currentUser={currentUser}
        />
      </div>
    </header>
  );
}

export default Header;
