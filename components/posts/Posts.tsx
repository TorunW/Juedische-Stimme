import React, { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import Post from './Post';
import Pagination from 'components/pagination/Pagination';
import SearchFilter from 'components/SearchFilter';
import styles from './Styles.module.css';
import Placeholder from '../placeholder/Placeholder';
import PostsHeader from './PostsHeader';
import getImageDimensions from 'helpers/getImageDimensions';
import { useSelector } from 'store/hooks';
import { getLabel } from 'helpers/getLabelHelper';

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
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : null
  );

  const { labels } = useSelector((state) => state.labels);
  const { locale } = useSelector((state) => state.languages);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  /* POSTS */

  const imageDimensions = getImageDimensions(
    windowWidth,
    title === 'Newsletter' ? 'newsletter list item' : 'post list item'
  );
  const postsDisplay: ReactElement = (
    <div className={styles.postsContainer}>
      {posts && posts !== null
        ? posts.map((post: any, index: number) => (
            <Post
              key={index}
              post={post}
              phrase={phrase}
              imageDimensions={imageDimensions}
            />
          ))
        : [0, 1, 2, 3, 4, 5].map((ph, index) => <Placeholder key={index} />)}
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
          {getLabel(labels, locale, 'read_more', 'Weiter Lesen')}
        </a>
      </Link>
    </div>
  );

  if (pageNum && pageNum !== null) {
    headerDisplay = <PostsHeader />;

    searchDisplay = <SearchFilter phrase={phrase} />;

    postsTemplateDisplay = (
      <div className={styles.postPage}>{postsDisplay}</div>
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
  let pathname;

  return (
    <section
      className={
        'posts-sections ' +
        (title === 'Newsletter' ? styles.threeColPage : styles.twoColPage)
      }
      style={{
        marginTop:
          pathname === '/' ? '120px' : windowWidth > 844 ? '109px' : '80px',
      }}
    >
      <>
        {headerDisplay}
        {searchDisplay}
        {postsTemplateDisplay}
        {paginationDisplay}
      </>
    </section>
  );
}

export default Posts;
