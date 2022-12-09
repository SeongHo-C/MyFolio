import React, { useContext } from 'react';
import { OauthContext } from '../../context/oauthContext';
import styles from './header.module.css';

export default function Header() {
  const { onLogout } = useContext(OauthContext);

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
  };

  return (
    <nav className={styles.nav}>
      <h1 className={styles.title}>{`<MyFolio />`}</h1>
      <div className={styles.buttons}>
        <button className={styles.add}>프로젝트 추가</button>
        <button className={styles.logout} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </nav>
  );
}
