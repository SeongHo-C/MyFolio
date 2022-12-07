import styles from './App.module.css';
import React from 'react';
import Main from './screens/main/main';

export default function App() {
  return (
    <div className={styles.app}>
      <Main />
    </div>
  );
}
