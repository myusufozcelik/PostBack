import UserSignupPage from "../pages/UserSignupPage";
import LoginPage from "../pages/LoginPage";
import LanguageSelector from "../components/LanguageSelector";
import React from "react";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import TopBar from "../components/TopBar";

// BrowserRouter her seferinde backendi tetiklediği için hashrouter kullandık
class App extends React.Component {
  state = {
    isLoggedIn: false,
    userName: "user1",
  };

  onLoginSuccess = (userName) => {
    this.setState({
      userName: userName,
      isLoggedIn: true,
    });
  };

  onLogoutSuccess = () => {
    this.setState({
      isLoggedIn: false,
      userName: undefined,
    });
  };

  render() {
    const { isLoggedIn, userName } = this.state;

    return (
      <div>
        <Router>
          <TopBar
            userName={userName}
            isLoggedIn={isLoggedIn}
            onLogoutSuccess={this.onLogoutSuccess}
          />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && (
              <Route
                path="/login"
                component={(props) => {
                  return (
                    <LoginPage
                      {...props}
                      onLoginSuccess={this.onLoginSuccess}
                    />
                  );
                }}
              />
            )}
            <Route path="/signup" component={UserSignupPage} />
            <Route path="/user/:username" component={UserPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
        <LanguageSelector />
      </div>
    );
  }
}

export default App;
