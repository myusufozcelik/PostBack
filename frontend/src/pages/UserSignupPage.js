import React from "react";
import { signup, changeLanguage } from "../api/apiCalls";
import Input from "../components/input";
import { withTranslation } from "react-i18next";

class UserSignupPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
    errors: [],
  };

  onChangeMethod = (e) => {
    const { t } = this.props;
    const { name, value } = e.target;
    const errors = { ...this.state.errors }; // errors state objesinin kopyasını aldık
    errors[name] = undefined;
    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = t("Password mismatch");
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = t("Password mismatch");
      } else {
        errors.passwordRepeat = undefined;
      }
    }
    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickSignUp = async (e) => {
    e.preventDefault();
    const { username, displayName, password } = this.state;
    const body = {
      username,
      displayName,
      password,
    };

    this.setState({
      pendingApiCall: true,
    });

    try {
      const response = await signup(body);
    } catch (error) {
      // her aldığımız hata validation hatası olmayabilir bu nedenle kontrol ediyoruz
      if (error.response.data.validationErrors) {
        this.setState({
          errors: error.response.data.validationErrors,
        });
      }
    }

    this.setState({ pendingApiCall: false });
  };

  onChangeLanguage = (language) => {
    const { i18n } = this.props;
    i18n.changeLanguage(language);
    changeLanguage(language);
  };

  render() {
    const { pendingApiCall, errors } = this.state;
    const { username, displayName, password, passwordRepeat } = errors;
    const { t } = this.props;
    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Sign Up")}</h1>
          <Input
            name="username"
            label={t("Username")}
            error={username}
            onChange={this.onChangeMethod}
          />
          <Input
            name="displayName"
            label={t("Display Name")}
            error={displayName}
            onChange={this.onChangeMethod}
          />
          <Input
            name="password"
            label={t("Password")}
            error={password}
            onChange={this.onChangeMethod}
            type="password"
          />

          <Input
            name="passwordRepeat"
            label={t("Password Repeat")}
            error={passwordRepeat}
            onChange={this.onChangeMethod}
            type="password"
          />

          <div className="text-center">
            <button
              className="btn btn-primary"
              disabled={pendingApiCall || passwordRepeat !== undefined}
              onClick={this.onClickSignUp}
            >
              {pendingApiCall && (
                <span className="spinner-border spinner-order-sm"></span>
              )}
              {t("Sign Up")}
            </button>
          </div>
          <div>
            <img
              src="https://www.countryflags.io/tr/flat/24.png"
              alt="Turkish Flag"
              onClick={() => this.onChangeLanguage("tr")}
              style={{ cursor: "pointer" }}
            ></img>
            <img
              src="https://www.countryflags.io/us/flat/24.png"
              alt="USA Flag"
              onClick={() => this.onChangeLanguage("en")}
              style={{ cursor: "pointer" }}
            ></img>
          </div>
        </form>
      </div>
    );
  }
}

const UserSignUpPageWithTranslation = withTranslation()(UserSignupPage);

export default UserSignUpPageWithTranslation;
