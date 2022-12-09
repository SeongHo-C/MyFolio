import React, { useRef, useState } from 'react';
import TagItem from '../../components/tagItem/tagItem';
import styles from './project_create.module.css';

export default function ProjectCreate() {
  const [tagItem, setTagItem] = useState([]);

  const tagRef = useRef();

  const handleTagAdd = (e) => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      const updated = [...tagItem];
      updated.push(tagRef.current.value);

      tagRef.current.value = '';
      setTagItem([...new Set(updated)]);
    }
  };

  const handleTagRemove = (tag) => {
    const updated = tagItem.filter((item) => item !== tag);

    setTagItem(updated);
  };

  return (
    <form className={styles.ProjectCreate}>
      <section className={styles.box}>
        <label htmlFor='title' className={styles.title}>
          제목
        </label>
        <input
          placeholder='제목을 입력하세요'
          type='text'
          name='title'
          className={styles.input}
        />
      </section>
      <section className={styles.box}>
        <label htmlFor='tag' className={styles.title}>
          태그
        </label>
        <input
          placeholder='태그를 입력하고 엔터를 누르세요'
          ref={tagRef}
          type='text'
          name='tag'
          className={styles.input}
          onKeyDown={handleTagAdd}
        />
        <ul className={styles.tagItem}>
          {tagItem.map((tag, idx) => (
            <TagItem key={idx} tag={tag} onTagRemove={handleTagRemove} />
          ))}
        </ul>
      </section>
    </form>
  );
}
