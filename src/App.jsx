import styles from './App.module.css';
import React, { useContext, useEffect, useState } from 'react';
import Main from './screens/main/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OauthContext, OauthProvider } from './context/oauthContext';
import Oauth from './screens/oauth/oauth';
import Header from './components/header/header';
import Login from './components/login/login';
import ProjectCreate from './screens/project_create/project_create';

export default function App() {
  const { userInfo } = useContext(OauthContext);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        {userInfo && <Header />}
        <Routes>
          <Route path='/' exact element={<Main />} />
          <Route path='/oauth/saving' element={<Oauth />} />
          <Route path='/project/create' element={<ProjectCreate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
