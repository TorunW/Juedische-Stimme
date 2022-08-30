import React, { ReactElement, useState, useEffect } from 'react';
import styles from './Styles.module.css';
import Post from './Post';
import Link from 'next/link';
import Pagination from '../pagination/Pagination';

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

  // as a prop type
  let buttonDisplay: ReactElement;
  if (pageNum && pageNum !== null) {
    if (postsCount > postsPerPage)
    buttonDisplay = (
      <Pagination 
        pageNum={pageNum}
        itemsCount={postsCount}
        itemsPerPage={postsPerPage}
        type={'category'}
        title={title}
      />
    );
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
      {buttonDisplay}
    </section>
  );
}

export default Posts;
