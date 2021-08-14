import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
import './bootstrap-override.scss';
import UserSignupPage from './pages/UserSignupPage';
import LoginPage from './pages/LoginPage';
import LanguageSelector from './components/LanguageSelector';

ReactDOM.render(
    <div>
    <LoginPage />
    <LanguageSelector />
    </div>
  ,
  document.getElementById('root')
);
