import styles from './App.module.css';
import React from 'react';
import Main from './screens/main/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OauthProvider } from './context/oauthContext';

export default function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <OauthProvider>
          <Routes>
            <Route path='/' exact element={<Main />} />
            <Route path='/oauth/saving' element={<OauthProvider />} />
          </Routes>
        </OauthProvider>
      </BrowserRouter>
    </div>
  );
}
