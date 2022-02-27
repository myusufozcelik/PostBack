import React from "react";
import signup from "../api/apiCalls";

class UserSignupPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
  };

  onChangeMethod = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
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
    } catch (err) {
      console.log(err);
    }

    this.setState({ pendingApiCall: false });

    //   signup(body)
    //     .then((response) => {
    //       this.setState({ pendingApiCall: false });
    //     })
    //     .catch((err) => {
    //       this.setState({
    //         pendingApiCall: false,
    //       });
    //     });
  };

  render() {
    const { pendingApiCall } = this.state;
    return (
      <div className="container">
        <form>
          <h1 className="text-center">Sign Up</h1>
          <div className="form-group">
            <label>username</label>
            <input
              className="form-control"
              autoComplete="off"
              name="username"
              onChange={this.onChangeMethod}
            />
          </div>
          <div className="form-group">
            <label>Display Name</label>
            <input
              className="form-control"
              autoComplete="off"
              name="displayName"
              onChange={this.onChangeMethod}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              name="password"
              onChange={this.onChangeMethod}
              type="password"
            />
          </div>
          <div className="form-group">
            <label>Password Repeat</label>
            <input
              className="form-control"
              name="passwordRepeat"
              onChange={this.onChangeMethod}
              type="password"
            />
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary"
              disabled={pendingApiCall}
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
