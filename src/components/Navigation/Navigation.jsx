import React from "react";
import { NavLink } from "react-router-dom";

import "./Navigation.css";
import logoutWhite from "../../assets/logout-white.svg";
import logoutBlack from "../../assets/logout-black.svg";
import menuWhite from "../../assets/menu-white.svg";
import menuBlack from "../../assets/menu-black.svg";
import menuClose from "../../assets/menu-close.svg";

function Navigation({
  isLoggedIn,
  handleLoginClick,
  handleLogout,
  currentUser = { name: "Name" },
  isMenuOpen,
  setIsMenuOpen,
}) {
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const getInputClassName = (type, isActive) => {
    return `navigation__link navigation__link_type_${type}${
      isActive ? " navigation__link_active" : ""
    }`;
  };

  return (
    <>
      <button
        className="navigation__menu-button"
        type="button"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <img
          className="navigation__menu-icon navigation__menu-icon_theme_white"
          src={isMenuOpen ? menuClose : menuWhite}
          alt="Menu"
        />
        <img
          className="navigation__menu-icon navigation__menu-icon_theme_black"
          src={isMenuOpen ? menuClose : menuBlack}
          alt="Menu"
        />
      </button>

      <div
        className={`navigation__links ${
          isMenuOpen ? "navigation__links_mobile_open" : ""
        } ${isLoggedIn ? "navigation__links_logged-in" : ""}`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${getInputClassName("home", isActive)} navigation__link_home`
          }
          onClick={() => setIsMenuOpen(false)}
          end
        >
          Home
        </NavLink>

        {isLoggedIn && (
          <NavLink
            to="/saved-news"
            className={({ isActive }) =>
              `${getInputClassName("saved", isActive)} navigation__link_saved`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Saved articles
          </NavLink>
        )}

        {isLoggedIn ? (
          <button
            className="navigation__user-button"
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
          >
            {currentUser?.name || "Name"}
            <img
              className="navigation__logout-icon navigation__logout-icon_theme_white"
              src={logoutWhite}
              alt="Logout"
            />
            <img
              className="navigation__logout-icon navigation__logout-icon_theme_black"
              src={logoutBlack}
              alt="Logout"
            />
          </button>
        ) : (
          <button
            className="navigation__sign-in-button"
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              handleLoginClick();
            }}
          >
            Sign in
          </button>
        )}
      </div>
    </>
  );
}

export default Navigation;
