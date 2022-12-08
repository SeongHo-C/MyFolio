import React, { useContext } from 'react';
import Login from '../../components/login/login';
import { OauthContext } from '../../context/oauthContext';
import styles from './main.module.css';

export default function Main() {
  const {
    userInfo: { isLogin },
  } = useContext(OauthContext);

  return (
    <div className={styles.main}>
      {isLogin ? <p>로그인 된 상태</p> : <Login />}
    </div>
  );
}