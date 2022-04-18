import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/postback.png";
// import { Authentication } from "../shared/AuthenticationContext";

class TopBar extends Component {
  // static contextType = Authentication;
  render(props) {
    const { t } = this.props;

    const onLogoutSuccess = () => {};
    const isLoggedIn = false;
    const username = undefined;
    let links = (
      <ul className="navbar-nav ml-auto">
        <li>
          <Link className="nav-link" to="/login">
            {t("Login")}
          </Link>
        </li> 
        <li>
          <Link className="nav-link" to="/signup">
            {t("Sign Up")}
          </Link>
        </li>
      </ul>
    );

    if (isLoggedIn) {
      links = (
        <ul className="navbar-nav ml-auto">
          <li>
            <Link className="nav-link" to={`/user/${username}`}>
              {username}
            </Link>
          </li>
          <li
            className="nav-link"
            onClick={onLogoutSuccess}
            style={{ cursor: "pointer" }}
          >
            {t("Logout")}
          </li>
        </ul>
      );
    }

    return (
      <div className="shadow-sm bg-light mb-2">
        <nav className="navbar navbar-expand-lg navbar-light container navbar-expand">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="100" alt="Postback Logo" />
          </Link>
          {links}
        </nav>
      </div>
    );
  }
}

export default withTranslation()(TopBar);
