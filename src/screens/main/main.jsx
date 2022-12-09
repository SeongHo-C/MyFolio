import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../../components/header/header';
import Login from '../../components/login/login';
import { OauthContext } from '../../context/oauthContext';
import styles from './main.module.css';

export default function Main() {
  const { userInfo } = useContext(OauthContext);

  return <div className={styles.main}>{userInfo ? '' : <Login />}</div>;
}
