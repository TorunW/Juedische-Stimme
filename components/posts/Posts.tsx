import React, { ReactElement, useState, useEffect } from 'react';
import styles from './Styles.module.css';
import Post from './Post';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';

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
  let numberOfPages = [];

  for (let i = 1; 1 <= Math.ceil(postsCount / postsPerPage); i++) {
    numberOfPages.push(i);
  }

  // function pageRange(numberOfPages, pageNum) {
  //   let minNumber = pageNum - 5;
  //   let maxNumber = pageNum + 5;
  //   let diff = 0;
  //   console.log(minNumber, maxNumber);
  // }

  // function recive totoal number of pages, recives the current page,
  // dertirme min number and max number,  min = pageNum - 5, max = pagenum + 5
  // let diff = 0
  // then adjust if min is smaller than one then diff = 1 - minnumber
  //  after the if => min + diff, max + diff
  // return an object with minnumber and maxnumber,

  let buttonDisplay: ReactElement;
  if (pageNum !== null) {
    buttonDisplay = (
      <ul className={styles.pagination}>
        {numberOfPages.map((number) => (
          <li key={number} className={styles.pageItem}>
            <a href={number} className={styles.pageLink}>
              {number}
            </a>
          </li>
        ))}
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
