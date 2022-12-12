import React from 'react';
import styles from './portfolio_card.module.css';
import { BsGithub, BsGlobe } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function PortfolioCard({ project }) {
  const { thumbnailUrl, title, tags, githubUrl, webUrl, summary, id } = project;

  const navigate = useNavigate();

  return (
    <section className={styles.card} onClick={() => navigate(`/project/${id}`)}>
      <img className={styles.img} src={thumbnailUrl} alt='프로젝트 미리보기' />
      <main className={styles.main}>
        <span style={{ fontWeight: '600' }}>{title}</span>
        <span className={styles.summary}>{summary}</span>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span className={styles.tag} key={tag.id}>
              {tag.name}
            </span>
          ))}
        </div>
      </main>
      <footer className={styles.footer}>
        {githubUrl && (
          <BsGithub
            className={styles.github}
            onClick={() => window.open(githubUrl, '_blank')}
          />
        )}
        {webUrl && (
          <a href={webUrl}>
            <BsGlobe
              className={styles.web}
              onClick={() => window.open(webUrl, '_blank')}
            />
          </a>
        )}
      </footer>
    </section>
  );
}
