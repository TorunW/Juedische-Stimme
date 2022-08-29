import React, { ReactElement, useState, useEffect } from 'react';
import styles from './Styles.module.css';
import Post from './Post';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import { number } from 'yup';

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
  const [minNumber, setMinNumber] = useState(pageNum - 5);
  const [maxNumber, setMaxNumber] = useState(pageNum + 5);
  const numberOfPages = [];
  for (let i = 1; i <= Math.ceil(postsCount / postsPerPage); i++) {
    numberOfPages.push(i);
  }

  let diff = 0;

  function pageRange() {
    if (minNumber < 1) {
      diff = 1 - minNumber;
      console.log(minNumber, 'minnumber');
    }
    // minNumber + diff;
    // maxNumber + diff;
  }

  pageRange();
  console.log(minNumber, 'min', diff, 'diff');

  function prevPage() {
    window.location.href = `/category/${title}/page/${pageNum - 1}`;
  }

  function nextPage() {
    window.location.href = `/category/${title}/page/${pageNum + 1}`;
  }

  let buttonDisplay: ReactElement;
  if (pageNum !== null) {
    buttonDisplay = (
      <ul className={styles.pagination}>
        <button onClick={prevPage}>prev</button>
        {numberOfPages.map((number) => (
          <li key={number} className={styles.pageItem}>
            <a href={number}>{number}</a>
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
