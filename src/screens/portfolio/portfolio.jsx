import React from 'react';
import Search from '../../components/search/search';
import styles from './portfolio.module.css';

export default function Portfolio() {
  return (
    <div className={styles.portfolio}>
      <section className={styles.search}>
        <p style={{ fontSize: '20px' }}>마이폴리오에서 프로젝트를 관리하세요</p>
        <Search />
      </section>
    </div>
  );
}
