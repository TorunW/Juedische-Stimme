import React from 'react';
import styles from './Styles.module.css';
import Post from './Post';
import Link from 'next/link';

interface PostsProps {
  posts: any[];
  title?: string;
  phrase?: string;
  postsCount?: number;
  postsPerPage?: number;
  pageNum?: number;
}

function Posts({
  posts,
  title,
  phrase,
  postsCount,
  postsPerPage,
  pageNum,
}: PostsProps) {
  console.log(postsCount, postsPerPage, pageNum);

  let buttonDisplay;
  if (typeof window !== 'undefined') {
    if (window.location.pathname === `/category/${title}/page/${pageNum}`) {
      buttonDisplay = <div>pagination</div>;
    }
  } else {
    buttonDisplay = (
      <div className='link whiteBg'>
        <Link href={`/category/${title}`}>
          <a className='link-button'>
            Weitere {title === 'Aktuelles' ? 'Artikeln' : title} lesen
          </a>
        </Link>
      </div>
    );
  }

  return (
    <section
      className={
        'posts-sections ' +
        (title === 'Newsletter' ? styles.threeColPage : styles.twoColPage)
      }
    >
      <h1>{title}</h1>
      <div className={styles.postsContainer}>
        {posts && posts !== null
          ? posts.map((post: any, index: number) => {
              return <Post key={index} post={post} phrase={phrase} />;
            })
          : ''}
      </div>
      <div>{buttonDisplay}</div>
    </section>
  );
}

export default Posts;
