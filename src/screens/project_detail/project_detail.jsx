import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OauthContext } from '../../context/oauthContext';
import { TokenCheck } from '../../service/token_check';
import { BsGithub, BsGlobe } from 'react-icons/bs';
import { Viewer } from '@toast-ui/react-editor';

import styles from './project_detail.module.css';
import instance from '../../service/interceptor';

export default function ProjectDetail() {
  const [project, setProject] = useState();
  const { onRefresh } = useContext(OauthContext);

  const id = useParams().id;

  const navigate = useNavigate();

  const getProject = async () => {
    if (TokenCheck()) onRefresh();

    try {
      await instance
        .get(`/project/${id}`)
        .then((response) => response.data)
        .then((data) => {
          const modifiedDate = handleDate(new Date(data.modifiedDate));
          setProject({ ...data, modifiedDate });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDate = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;

    return (
      date.getFullYear() + '.' + month + '.' + day + ' ' + hour + ':' + minute
    );
  };

  const handleDelete = async () => {
    const result = window.confirm(
      '이 포트폴리오를 완전히 삭제합니다. 계속 하시겠습니까?'
    );

    if (result) {
      if (TokenCheck()) onRefresh();

      try {
        await instance.delete(`/project/${id}`).then(() => {
          alert('삭제 완료되었습니다.');
          navigate('/');
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!project) return;

  return (
    <section className={styles.detail}>
      <div className={styles.date}>
        <span style={{ marginRight: '10px' }}>{project.modifiedDate}</span>
        <button>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
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
