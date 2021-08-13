import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
import './bootstrap-override.scss';
import UserSignupPage from './pages/UserSignupPage';

ReactDOM.render(
  <React.StrictMode>
    <UserSignupPage />
  </React.StrictMode>,
  document.getElementById('root')
);
