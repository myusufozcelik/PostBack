import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './bootstrap-override.scss';
import UserSignupPage from './pages/UserSignupPage';

ReactDOM.render(
  <React.StrictMode>
    <UserSignupPage />
  </React.StrictMode>,
  document.getElementById('root')
);
