import React, { useContext } from 'react';
import { OauthContext } from '../../context/oauthContext';
import styles from './header.module.css';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { onLogout } = useContext(OauthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    onLogout();

    navigate('/');
  };

  const moveProjectCreate = () => {
    navigate('/project/create');
  };

  return (
    <nav className={styles.nav}>
      <button
        className={styles.title}
        onClick={() => navigate('/')}
      >{`<MyFolio />`}</button>
      <div className={styles.buttons}>
        <button className={styles.add} onClick={moveProjectCreate}>
          프로젝트 추가
        </button>
        <button className={styles.logout} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </nav>
  );
}
