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
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);
  console.log(postsCount, postsPerPage, pageNum);
  console.log(currentPosts);

  useEffect(() => {
    const endOffset = itemOffset + postsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentPosts(posts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(postsCount / postsPerPage));
  }, [itemOffset, postsPerPage, posts]);

  const handlePageClick = (pageNum) => {
    console.log(pageNum, 'event');
    const newOffset = (pageNum.selected * postsPerPage) % posts.length;
    console.log(
      `User requested page number ${pageNum.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  let buttonDisplay: ReactElement;
  if (pageNum !== null) {
    buttonDisplay = (
      <ReactPaginate
        breakLabel='...'
        nextLabel='next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel='< previous'
        renderOnZeroPageCount={null}
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
