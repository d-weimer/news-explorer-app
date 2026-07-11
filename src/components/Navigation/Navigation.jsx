import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./Navigation.css";

function Navigation({ isLoggedIn }) {
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
      <button className="navigation__sign-in-button" type="button">
        Sign in
      </button>
    </div>
  );
}

export default Navigation;
