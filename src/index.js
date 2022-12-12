import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { OauthProvider } from './context/oauthContext';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { setAuthorizationToken } from './service/setAuthorizationToken';

const token = localStorage.getItem('accessToken');
token && setAuthorizationToken(token);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OauthProvider>
      <App />
    </OauthProvider>
  </React.StrictMode>
);

reportWebVitals();
