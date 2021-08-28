import React, { Component } from "react";

export const Authentication = React.createContext();

export class AuthenticationContext extends Component {
  state = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined,
  };

  onLoginSuccess = (authState) => {
    console.log(...authState);
    const { username, displayName, password, image, isLoggedIn } = authState;
    this.setState({
      //...authState, bu şekilde ya da
      username: username,
      displayName,
      password,
      image,
      isLoggedIn,
    });
  };

  onLogoutSuccess = () => {
    this.setState({
      isLoggedIn: false,
      userName: undefined,
    });
  };

  render() { // Authenticaton dan provider oluşturup değerleri value olarak verdik
    return ( 
      <Authentication.Provider
        value={{
          state: { ...this.state },
          onLoginSuccess: this.onLoginSuccess,
          onLogoutSuccess: this.onLogoutSuccess,
        }}
      >
        {this.props.children}
      </Authentication.Provider>
    );
  }
}

export default AuthenticationContext;
