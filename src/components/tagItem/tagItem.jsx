import React from 'react';
import styles from './tagItem.module.css';

export default function TagItem({ tag, onTagRemove }) {
  return (
    <span className={styles.tag} onClick={() => onTagRemove(tag)}>
      {tag}
    </span>
  );
}
