import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./i18n";
import "./bootstrap-override.scss";
import App from "./container/App";
import AuthenticationContext from "./shared/AuthenticationContext";


ReactDOM.render(<AuthenticationContext> 
    <App />
     </AuthenticationContext>, document.getElementById("root"));
