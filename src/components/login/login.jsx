import React from 'react';
import styles from './login.module.css';

export default function Login() {
  const url = process.env.REACT_APP_URL;

  return (
    <section className={styles.login}>
      <h1 className={styles.title}>{`<MyFolio />`}</h1>
      <article className={styles.content}>
        <p>나만의 포트폴리오를</p>
        <p>만들어 볼까요?</p>
      </article>
      <div className={styles.googleBtn}>
        <a href={`${url}/oauth2/authorization/google`}>
          <img src='../../images/google.png' alt='구글 로그인' />
        </a>
      </div>
    </section>
  );
}
