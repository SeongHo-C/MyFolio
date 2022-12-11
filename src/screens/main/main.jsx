import React, { useContext } from 'react';

import Login from '../../components/login/login';
import { OauthContext } from '../../context/oauthContext';
import { ProjectsProvider } from '../../context/projectsContext';
import Portfolio from '../portfolio/portfolio';
import styles from './main.module.css';

export default function Main() {
  const { userInfo } = useContext(OauthContext);

  return (
    <div className={styles.main}>
      {userInfo ? (
        <ProjectsProvider>
          <Portfolio />
        </ProjectsProvider>
      ) : (
        <Login />
      )}
    </div>
  );
}
