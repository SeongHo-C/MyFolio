import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OauthContext } from '../../context/oauthContext';
import { TokenCheck } from '../../service/token_check';
import { BsGithub, BsGlobe } from 'react-icons/bs';
import { Viewer } from '@toast-ui/react-editor';

import styles from './project_detail.module.css';

export default function ProjectDetail() {
  const [project, setProject] = useState();
  const { onRefresh } = useContext(OauthContext);

  const url = process.env.REACT_APP_URL;
  const id = useParams().id;

  const getProject = async () => {
    if (TokenCheck()) onRefresh();

    try {
      await axios
        .get(`${url}/project/${id}`)
        .then((response) => setProject(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!project) return;

  return (
    <section className={styles.detail}>
      <h1 className={styles.title}>{project.title}</h1>
      <div className={styles.tags}>
        {project.tags.map((tag) => (
          <span className={styles.tag} key={tag.id}>
            {tag.name}
          </span>
        ))}
      </div>
      <div className={styles.summary}>{`👉 ${project.summary}`}</div>
      <div className={styles.url}>
        {project.githubUrl && (
          <BsGithub
            className={styles.github}
            onClick={() => window.open(project.githubUrl, '_blank')}
          />
        )}
        {project.webUrl && (
          <BsGlobe
            className={styles.web}
            onClick={() => window.open(project.webUrl, '_blank')}
          />
        )}
      </div>
      <Viewer initialValue={project.content} />
    </section>
  );
}
