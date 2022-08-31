import React, { ReactElement, useState, useEffect } from 'react';
import styles from './Styles.module.css';
import Post from './Post';
import Link from 'next/link';
import Pagination from '../pagination/Pagination';
import Image from 'next/image';
import postHeader from 'public/post-header.jpg';
import SearchFilter from '../SearchFilter';

interface PostsProps {
  posts: any[];
  title?: string;
  phrase?: string;
  postsCount?: number;
  postsPerPage?: number;
  pageNum?: number;
  type?: string;
}

function Posts({
  posts,
  title,
  phrase,
  postsCount,
  postsPerPage,
  pageNum,
  type,
}: PostsProps) {
  // as a prop type

  let headerDisplay: ReactElement = <h1>{title}</h1>;
  let searchDisplay: ReactElement;
  let postsDisplay: ReactElement = (
    <div className={styles.postsContainer}>
      {posts && posts !== null
        ? posts.map((post: any, index: number) => {
            return <Post key={index} post={post} phrase={phrase} />;
          })
        : ''}
    </div>
  );
  let paginationDisplay: ReactElement = (
    <div className='link whiteBg'>
      <Link href={`/category/${title}`}>
        <a className='link-button'>
          Weitere {title === 'Aktuelles' ? 'Artikeln' : title} lesen
        </a>
      </Link>
    </div>
  );

  if (pageNum && pageNum !== null) {

    headerDisplay = (
      <div className={styles.header}>
        <div className={styles.imageWrapper}>
          <div className={styles.backgroundOverlay}></div>
          <Image
            src={postHeader}
            className={styles.headerImage}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    );

    searchDisplay = <SearchFilter phrase={phrase} />

    postsDisplay = (
      <div className={styles.postPage}>
        <div className={styles.postsContainer}>
          {posts && posts !== null
            ? posts.map((post: any, index: number) => {
                return <Post key={index} post={post} phrase={phrase} />;
              })
            : ''}
        </div>
      </div>
    );

    paginationDisplay = <React.Fragment>{''}</React.Fragment>
    if (postsCount > postsPerPage){
      paginationDisplay = (
        <Pagination
          pageNum={pageNum}
          itemsCount={postsCount}
          itemsPerPage={postsPerPage}
          type={type}
          title={title}
        />
      );
    }
  }

  return (
    <section
      className={
        'posts-sections ' +
        (title === 'Newsletter' ? styles.threeColPage : styles.twoColPage)
      }
    >
      {headerDisplay}
      {searchDisplay}
      {postsDisplay}
      {paginationDisplay}
    </section>
  );
}

export default Posts;
