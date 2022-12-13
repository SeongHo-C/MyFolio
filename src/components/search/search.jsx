import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './search.module.css';
import { BiSearch } from 'react-icons/bi';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { projectsContext } from '../../context/projectsContext';
import instance from '../../service/interceptor';

export default function Search() {
  const [type, setType] = useState('제목');
  const [open, setOpen] = useState(false);
  const { getProjects } = useContext(projectsContext);
  const [tags, setTags] = useState('');

  const inputRef = useRef();

  const handleChandeTag = (e) => {
    setType(e.target.innerText);
    setOpen(!open);
  };

  const onSearch = () => {
    const keyword = inputRef.current.value;
    const typeChange = type === '제목' ? 'TITLE' : 'TAG';

    getProjects(keyword, typeChange);
  };

  const onTagSearch = async () => {
    const keyword = inputRef.current.value;
    if (!keyword) {
      setTags('');
      return;
    }

    await instance
      .get(`/tag?tagName=${keyword}`)
      .then((response) => response.data)
      .then((data) => {
        if (data.length > 10) data = data.splice(0, 10);

        setTags(data);
      });
  };

  return (
    <div>
      <div
        className={
          tags.length > 0 ? `${styles.searchTagWrap}` : `${styles.searchWrap}`
        }
      >
        <div className={styles.search}>
          <section className={styles.type} onClick={() => setOpen(!open)}>
            <span className={styles.select}>{type}</span>
            <BsFillCaretDownFill className={styles.selectBtn} />
          </section>
          <input
            ref={inputRef}
            placeholder='검색을 통해 빠르게 찾아보세요'
            type='text'
            className={styles.text}
            onKeyUp={(e) => {
              if (e.key === 'Enter') onSearch();
              else {
                if (type === '태그') onTagSearch();
              }
            }}
          />
        </div>

        <button className={styles.button} onClick={onSearch}>
          <BiSearch />
        </button>

        {open && (
          <ul className={styles.ul} onClick={handleChandeTag}>
            <li className={styles.li}>제목</li>
            <li className={styles.li}>태그</li>
          </ul>
        )}
      </div>
      {tags?.length > 0 && (
        <div className={styles.autoTag}>
          {tags.map((tag) => (
            <span className={styles.tag} key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
