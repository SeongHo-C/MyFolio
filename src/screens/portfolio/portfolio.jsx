import React, { useContext, useEffect } from 'react';
import PortfolioCard from '../../components/portfolio_card/portfolio_card';
import Search from '../../components/search/search';
import { projectsContext } from '../../context/projectsContext';
import styles from './portfolio.module.css';

export default function Portfolio() {
  const { projects, getProjects } = useContext(projectsContext);

  return (
    <div className={styles.portfolio}>
      <section className={styles.search}>
        <p style={{ fontSize: '20px' }}>마이폴리오에서 프로젝트를 관리하세요</p>
        <Search />
      </section>
      <section className={styles.card}>
        {projects &&
          projects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
      </section>
    </div>
  );
}
