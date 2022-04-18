import "../App.css";
import ApiProgress from "../shared/ApiProgress";
import LanguageSelector from "../components/LanguageSelector";
import UserSignUpPage from "../pages/UserSignupPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import TopBar from "../components/TopBar";
import i18n from "../i18n";
import React from "react";
// import { Authentication } from "../shared/AuthenticationContext";

class App extends React.Component {
  // static contextType = Authentication;

  render() {
    const isLoggedIn = false;

    return (
      <div>
        <Router>
          <TopBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && <Route path="/login" component={LoginPage} />}
            <Route path="/signup" component={UserSignUpPage} />
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
