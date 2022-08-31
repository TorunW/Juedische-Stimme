import React, { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Post from './Post';
import Pagination from 'components/pagination/Pagination';
import SearchFilter from 'components/SearchFilter';
import styles from './Styles.module.css';
import postHeader from 'public/post-header.jpg';
import Placeholder from '../placeholder/Placeholder';

interface PostsProps {
  posts: any[];
  title?: string;
  pageNum?: number;
  phrase?: string;
  postsCount?: number;
  postsPerPage?: number;
  type?: string;
}

function Posts({
  posts,
  title,
  pageNum,
  postsCount,
  postsPerPage,
  phrase,
  type,
}: PostsProps) {

  /* POSTS */

  const postsDisplay: ReactElement = (
    <div className={styles.postsContainer}>
      {posts && posts !== null
        ? 
          posts.map((post: any, index: number) => (
            <Post key={index} post={post} phrase={phrase} />
          ))
        : 
          [0,1,2,3,4,5].map((ph,index) => (
            <Placeholder key={index}/>
          ))
        }
    </div>
  );

  /* TEMPLATE */

  let headerDisplay: ReactElement = <h1>{title}</h1>;
  let searchDisplay: ReactElement;
  
  let postsTemplateDisplay = postsDisplay;

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

    searchDisplay = <SearchFilter phrase={phrase} />;

    postsTemplateDisplay = (
      <div className={styles.postPage}>
        {postsDisplay}
      </div>
    );

    paginationDisplay = <React.Fragment>{''}</React.Fragment>;
    if (postsCount > postsPerPage) {
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
      {postsTemplateDisplay}
      {paginationDisplay}
    </section>
  );
}

export default Posts;
