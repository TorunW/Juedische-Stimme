import Link from 'next/link';
import React from 'react';

import styles from 'styles/Posts.module.css';

import Post from './Post';

function Posts(props) {
  return (
    <div
      className={
        props.title === 'Newsletter' ? styles.threeColPage : styles.twoColPage
      }
    >
      <h1>{props.title}</h1>
      <div className={styles.postsContainer}>
        {props.posts.map((post, index) => {
          return <Post post={post} />;
        })}
      </div>
      <div className='link whiteBg'>
        <a href={`/category/${props.title}`} className='link-button'>
          Weitere {props.title === 'Aktuelles' ? 'Artikeln' : props.title} lesen
        </a>
      </div>
    </div>
  );
}
export default Posts;
