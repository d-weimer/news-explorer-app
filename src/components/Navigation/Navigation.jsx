import React from "react";
import "./Navigation.css";

function Navigation() {
  const isLoggedIn = false;

  return (
    <nav className="navigation">
      <p className="navigation__link navigation__link_type_home navigation__link_active">
        Home
      </p>
      {isLoggedIn && (
        <p className="navigation__link navigation__link_type_saved">
          Saved articles
        </p>
      )}
      <button className="navigation__sign-in-button">Sign In</button>
    </nav>
  );
}

export default Navigation;
