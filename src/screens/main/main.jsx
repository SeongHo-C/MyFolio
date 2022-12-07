import React from 'react';
import styles from './main.module.css';

export default function Main() {
  return (
    <div className={styles.main}>
      <section className={styles.login}>
        <h1 className={styles.title}>{`<MyFolio />`}</h1>
        <article className={styles.content}>
          <p>나만의 포트폴리오를</p>
          <p>만들어 볼까요?</p>
        </article>
        <div className={styles.googleBtn}>
          <button>
            <img src='../../images/google.png' alt='구글 로그인' />
          </button>
        </div>
      </section>
    </div>
  );
}
