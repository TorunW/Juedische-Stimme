import formateDate from "helpers/formateDate";
import { generateFileServerSrc } from "helpers/generateFileServerSrc";
import { GeneratePostUrl } from "helpers/generatePostUrl";
import { getPostContentFields } from "helpers/getPostContentFields";
import trimStringToLastSpace from "helpers/trimStringToLastSpace";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "store/hooks";
import styles from "./Styles.module.css";

type Props = {
  post: any;
  phrase?: string;
  imageDimensions: any;
};

const Post: React.FC<Props> = ({ post, phrase, imageDimensions }) => {
  const { locale } = useSelector((state) => state.languages);
  const { postTitle, postExcerpt, postContent } = getPostContentFields(
    post,
    locale
  );

  return (
    <article
      className={styles.post}
      data-testid="post-container"
      onClick={() =>
        (window.location.href = `/${post.post_name
          .toString()
          .split("#")
          .join(":__--__:")}`)
      }
    >
      {post.post_image !== null ? (
        <div className={styles.imageWrapper}>
          <Image
            src={generateFileServerSrc(post.post_image)}
            alt={post.post_title}
            title={post.post_title}
            width={imageDimensions.width}
            height={imageDimensions.height}
          />
        </div>
      ) : (
        ""
      )}

      <div className={styles.date}>
        {post.post_date ? formateDate(post.post_date) : ""}
      </div>

      <Link href={"/" + GeneratePostUrl(post.post_name)}>
        <a className={styles.postTitle}>
          <h3>{postTitle}</h3>
        </a>
      </Link>

      <a
        href={`/category/${post.categoryName}`}
        className={styles.tags}
      >
        #{post.categoryName}
      </a>
      <div
        className={styles.postPreview}
        dangerouslySetInnerHTML={{
          __html: `${trimStringToLastSpace(
            postContent.substring(0, 400)
          )} [...]`,
        }}
      ></div>
    </article>
  );
};

export default Post;
