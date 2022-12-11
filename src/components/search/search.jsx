import React, { useState } from 'react';
import styles from './search.module.css';
import { BiSearch } from 'react-icons/bi';
import { BsFillCaretDownFill } from 'react-icons/bs';

export default function Search() {
  const [type, setType] = useState('제목');
  const [open, setOpen] = useState(false);

  const handleChandeTag = (e) => {
    setType(e.target.innerText);
    setOpen(!open);
  };

  return (
    <div className={styles.searchWrap}>
      <div className={styles.search}>
        <section className={styles.type} onClick={() => setOpen(!open)}>
          <span className={styles.select}>{type}</span>
          <BsFillCaretDownFill className={styles.selectBtn} />
        </section>
        <input
          placeholder='검색을 통해 빠르게 찾아보세요'
          type='text'
          className={styles.text}
        />
      </div>
      <button className={styles.button}>
        <BiSearch />
      </button>

      {open && (
        <ul className={styles.ul} onClick={handleChandeTag}>
          <li className={styles.li}>제목</li>
          <li className={styles.li}>태그</li>
        </ul>
      )}
    </div>
  );
}
