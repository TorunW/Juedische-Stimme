import React from 'react';

import styles from 'styles/Posts.module.css';

import Post from './Post';

function Posts(props) {
  console.log(props, 'hello');

  return (
    <div
      className={
        props.title === 'Newsletter' ? styles.threeColPage : styles.twoColPage
      }
    >
      <h1>{props.title}</h1>
      <div className={styles.postContainer}>
        {props.posts.map((post, index) => {
          return <Post post={post} />;
        })}
      </div>
      <div className='btnContainer'>
        <button>
          Weitere {props.title === 'Aktuelles' ? 'Artikeln' : props.title} lesen
        </button>
      </div>
    </div>
  );
}
export default Posts;
