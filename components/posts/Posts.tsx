import Pagination from "components/pagination/Pagination";
import SearchFilter from "components/SearchFilter";
import getImageDimensions from "helpers/getImageDimensions";
import { getLabel } from "helpers/getLabelHelper";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "store/hooks";
import Placeholder from "../placeholder/Placeholder";
import Post from "./Post";
import PostsHeader from "./PostsHeader";
import styles from "./Styles.module.css";

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
    typeof window !== "undefined" ? window.innerWidth : null
  );

  const { labels } = useSelector((state) => state.labels);
  const { locale } = useSelector((state) => state.languages);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  /* POSTS */

  const postsDisplay: ReactElement = (
    <div className={styles.postsContainer}>
      {!!posts
        ? posts.map((post: any, index: number) => (
            <Post
              key={index}
              post={post}
              phrase={phrase}
              imageDimensions={getImageDimensions(
                windowWidth,
                title === "Newsletter"
                  ? "newsletter list item"
                  : "post list item"
              )}
            />
          ))
        : [0, 1, 2, 3, 4, 5].map((ph, index) => <Placeholder key={index} />)}
    </div>
  );

  return (
    <section
      className={
        "posts-sections " +
        (title === "Newsletter" ? styles.threeColPage : styles.twoColPage)
      }
      style={{
        marginTop: windowWidth > 844 ? "109px" : "80px",
      }}
    >
      {/* pageNum means were on a category page */}
      {pageNum && pageNum !== null ? (
        <>
          <PostsHeader />
          <SearchFilter phrase={phrase} />
          <div className={styles.postPage}>{postsDisplay}</div>
          {postsCount - 1 > postsPerPage && (
            <Pagination
              pageNum={pageNum}
              itemsCount={postsCount}
              itemsPerPage={postsPerPage}
              type={type}
              title={title}
            />
          )}
        </>
      ) : (
        <>
          <h1>{title}</h1>
          <div className={styles.postPage}>{postsDisplay}</div>
          <div className="link whiteBg">
            <Link href={`/category/${title}`}>
              <a className="link-button">
                {getLabel(labels, locale, "read_more", "Weiter Lesen")}
              </a>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default Posts;
