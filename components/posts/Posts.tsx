import React, { ReactElement, useState, useEffect } from 'react';
import styles from './Styles.module.css';
import Post from './Post';
import Link from 'next/link';
import getRange from 'helpers/getPaginationRange';
import Image from 'next/image';
import postHeader from 'public/post-header.jpg';

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
  const { minNumber, maxNumber } = getRange(
    pageNum,
    Math.ceil(postsCount / postsPerPage)
  );

  const numberOfPages = [];
  for (let i = 1; i <= Math.ceil(postsCount / postsPerPage); i++) {
    numberOfPages.push(i);
  }

  function prevPage() {
    window.location.href = `/category/${title}/page/${pageNum - 1}`;
  }

  function nextPage() {
    window.location.href = `/category/${title}/page/${pageNum + 1}`;
  }

  let headerDisplay;
  if (pageNum !== undefined) {
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
  } else {
    headerDisplay = <h1>{title}</h1>;
  }

  let postsDisplay;

  if (pageNum !== undefined) {
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
  } else {
    postsDisplay = (
      <div className={styles.postsContainer}>
        {posts && posts !== null
          ? posts.map((post: any, index: number) => {
              return <Post key={index} post={post} phrase={phrase} />;
            })
          : ''}
      </div>
    );
  }

  console.log(posts);
  // as a prop type
  let buttonDisplay: ReactElement;
  if (pageNum !== undefined) {
    buttonDisplay = (
      <ul className={styles.pagination}>
        <button onClick={prevPage}>prev</button>
        {numberOfPages
          .filter((number) => number >= minNumber && number < maxNumber)
          .map((number) => (
            <li key={number} className={styles.pageItem}>
              <a
                href={`/category/${title}/page/${number}`}
                className={number === pageNum ? styles.active : styles.pageLink}
              >
                {number}
              </a>
            </li>
          ))}
        <button onClick={nextPage}>next</button>
      </ul>
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
      {headerDisplay}
      {postsDisplay}
      {buttonDisplay}
    </section>
  );
}

export default Posts;
