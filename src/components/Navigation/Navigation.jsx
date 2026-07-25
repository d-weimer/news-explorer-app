import React from "react";
import { NavLink } from "react-router-dom";

import "./Navigation.css";
import logoutWhite from "../../assets/logout-white.svg";
import logoutBlack from "../../assets/logout-black.svg";

function Navigation({
  isLoggedIn,
  handleLoginClick,
  handleLogout,
  currentUser = { name: "Name" },
}) {
  const getInputClassName = (type, isActive) => {
    return `navigation__link navigation__link_type_${type}${
      isActive ? " navigation__link_active" : ""
    }`;
  };

  return (
    <div className="navigation__links">
      <NavLink
        to="/"
        className={({ isActive }) => getInputClassName("home", isActive)}
        end
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/saved-news"
          className={({ isActive }) => getInputClassName("saved", isActive)}
        >
          Saved articles
        </NavLink>
      )}

      {isLoggedIn ? (
        <button
          className="navigation__user-button"
          type="button"
          onClick={handleLogout}
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
          onClick={handleLoginClick}
        >
          Sign in
        </button>
      )}
    </div>
  );
}

export default Navigation;
