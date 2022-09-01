import React from 'react';
import styles from '../placeholder/Styles.module.css';

function Placeholder() {
  return (
    <article className={styles.post} data-testid='post-container'>
      <div className={styles.imageWrapper + ' ' + styles.skeleton}>
        <div></div>
      </div>

      <div className={styles.date}>
        <div className={styles.skeletonDate + ' ' + styles.skeleton}></div>
      </div>

      <div className={styles.postTitle}>
        <h4>
          <div className={styles.skeletonTitle + ' ' + styles.skeleton}></div>
        </h4>
      </div>

      <div className={styles.tags}>
        <div className={styles.skeletonTags + ' ' + styles.skeleton}></div>
      </div>
      <div className={styles.postPreview}>
        <div className={styles.skeletonText + ' ' + styles.skeleton}></div>
        <div className={styles.skeletonText + ' ' + styles.skeleton}></div>
        <div className={styles.skeletonText + ' ' + styles.skeleton}></div>
        <div className={styles.skeletonText + ' ' + styles.skeleton}></div>
        <div className={styles.skeletonText + ' ' + styles.skeleton}></div>
        <div className={styles.skeletonText + ' ' + styles.skeleton}></div>
        <div className={styles.skeletonText + ' ' + styles.skeleton}></div>
      </div>
    </article>
  );
}

export default Placeholder;
