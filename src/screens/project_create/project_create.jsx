import React, { useRef, useState } from 'react';
import TagItem from '../../components/tagItem/tagItem';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
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
      <div className={styles.contentBox}>
        <span className={styles.title}>프로젝트 내용</span>
        <Editor
          className={styles.editor}
          initialValue='프로젝트 내용을 입력해주세요'
          previewStyle='vertical'
          hideModeSwitch='WYSIWYG'
          height='400px'
          initialEditType='markdown'
          useCommandShortcut={true}
          plugins={[colorSyntax]}
          toolbarItems={[
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task'],
            ['table', 'image'],
            ['codeblock'],
          ]}
        />
      </div>
    </form>
  );
}
