import React, { Component } from "react";
import logo from "../assets/postback.png";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

class TopBar extends Component {
  render() {
    const { t, isLoggedIn, userName, onLogoutSuccess } = this.props;

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
            <Link className="nav-link" to={`/user/${userName}`}>
              {userName}
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
      <div className="shadow-sm bg-light mr-4">
        <nav className="navbar navbar-light container navbar-expand">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="100" alt="PostBack Logo" />
          </Link>

          {links}
        </nav>
      </div>
    );
  }
}

export default withTranslation()(TopBar);
