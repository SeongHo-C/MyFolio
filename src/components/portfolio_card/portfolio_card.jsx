import React from 'react';
import styles from './portfolio_card.module.css';
import { BsGithub, BsGlobe } from 'react-icons/bs';

export default function PortfolioCard({ project }) {
  const { thumbnailUrl, title, tags, githubUrl, webUrl } = project;
  console.log(tags);
  return (
    <section className={styles.card}>
      <img className={styles.img} src={thumbnailUrl} alt='프로젝트 미리보기' />
      <main className={styles.main}>
        <span style={{ fontWeight: '600' }}>{title}</span>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span className={styles.tag} key={tag.id}>
              {tag.name}
            </span>
          ))}
        </div>
      </main>
      <footer className={styles.footer}>
        {githubUrl && <BsGithub className={styles.github} />}
        {webUrl && <BsGlobe className={styles.web} />}
      </footer>
    </section>
  );
}
