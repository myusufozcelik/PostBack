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
import { Authentication } from "../shared/AuthenticationContext";

// BrowserRouter her seferinde backendi tetiklediği için hashrouter kullandık
class App extends React.Component {
  static contextType = Authentication;
  render() {
    const isLoggedIn = this.context.state.isLoggedIn;

    return (
      <div>
        <Router>
          <TopBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && <Route path="/login" component={LoginPage} />}
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
