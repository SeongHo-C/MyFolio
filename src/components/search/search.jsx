import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './search.module.css';
import { BiSearch } from 'react-icons/bi';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { projectsContext } from '../../context/projectsContext';
import instance from '../../service/interceptor';
import { TokenCheck } from '../../service/token_check';
import { OauthContext } from '../../context/oauthContext';

export default function Search() {
  const [type, setType] = useState('제목');
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState('');
  const { getProjects } = useContext(projectsContext);
  const { onRefresh } = useContext(OauthContext);

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

    if (TokenCheck()) onRefresh();

    const response = await instance.get(`/tag?tagName=${keyword}`);

    if (response.data.length > 10) response.data = response.data.splice(0, 10);

    setTags(response.data);
  };

  const onClickTag = (tag) => {
    inputRef.current.value = tag;

    getProjects(tag, 'TAG');
  };

  useEffect(() => {
    const keyword = sessionStorage.getItem('keyword');
    const type = sessionStorage.getItem('type') === 'TITLE' ? '제목' : '태그';

    if (keyword) inputRef.current.value = keyword;
    setType(type);
  }, []);

  return (
    <div>
      <div
        className={
          tags.length > 0 ? `${styles.searchTagWrap}` : `${styles.searchWrap}`
        }
      >
        <div className={styles.search}>
          <section
            className={styles.type}
            onClick={() => {
              setOpen(!open);
              setTags('');
            }}
          >
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
          <ul className={styles.ul}>
            <li className={styles.li} onClick={handleChandeTag}>
              제목
            </li>
            <li className={styles.li} onClick={handleChandeTag}>
              태그
            </li>
          </ul>
        )}
      </div>
      {tags?.length > 0 && (
        <div className={styles.autoTag}>
          {tags.map((tag) => (
            <span
              className={styles.tag}
              key={tag}
              onClick={() => onClickTag(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
