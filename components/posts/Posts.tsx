import React from 'react';
import styles from './Styles.module.css';
import Post from './Post';

interface PostsProps {
  posts: any[];
  title?: string;
  phrase?: string;
}

function Posts({posts,title,phrase}:PostsProps) {
  
  return (

    <section
      className={
        'posts-sections ' +
        (title === 'Newsletter' ? styles.threeColPage : styles.twoColPage)
      }
    >
      <h1>{title}</h1>
      <div className={styles.postsContainer}>
        {posts && posts !== null ? posts.map((post:any, index:number) => {
          return <Post key={index} post={post} phrase={phrase} />;
        }) : ""}
      </div>
      <div className='link whiteBg'>
        <a href={`/category/${title}`} className='link-button'>
          Weitere {title === 'Aktuelles' ? 'Artikeln' : title} lesen
        </a>
      </div>
    </section>

  );
}

export default Posts;
