import React from "react";
import signup from "../api/apiCalls";
import Input from "../components/input";

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
    const { name, value } = e.target;
    const errors = { ...this.state.errors }; // errors state objesinin kopyasını aldık
    errors[name] = undefined;
    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = "Password mismatch";
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = "Password mismatch";
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

  render() {
    const { pendingApiCall, errors } = this.state;
    const { username, displayName, password, passwordRepeat } = errors;
    return (
      <div className="container">
        <form>
          <h1 className="text-center">Sign Up</h1>
          <Input
            name="username"
            label="Username"
            error={username}
            onChange={this.onChangeMethod}
          />
          <Input
            name="displayName"
            label="Display Name"
            error={displayName}
            onChange={this.onChangeMethod}
          />
          <Input
            name="password"
            label="Password"
            error={password}
            onChange={this.onChangeMethod}
            type="password"
          />

          <Input
            name="passwordRepeat"
            label="Password Repeat"
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSignupPage;
