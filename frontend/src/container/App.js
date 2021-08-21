import UserSignupPage from "../pages/UserSignupPage";
import LoginPage from "../pages/LoginPage";
import LanguageSelector from "../components/LanguageSelector";
import React from "react";

function App() {
  return (
    <div className="row">
      <div className="col">
        <UserSignupPage />
      </div>
      <div className="col">
        <LoginPage />
      </div>
      <LanguageSelector />
    </div>
  );
}

export default App;
