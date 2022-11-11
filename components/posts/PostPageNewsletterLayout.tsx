import React, { ReactElement } from "react";
import Share from "helpers/shareToSocialMedia";
import styles from "../posts/ListStyles.module.css";
import formateDate from "helpers/formateDate";
import { generateImageUrl } from "helpers/imageUrlHelper";
import Image from "next/image";
import { getPostContentFields } from "helpers/getPostContentFields";
import { generateFileServerSrc } from "helpers/generateFileServerSrc";
import { ImageWithFallback } from "../atoms/ImageWithFallback";

const PostPageNewsletterLayout = ({ post, locale }) => {
  const { postTitle, postExcerpt, postExcerpt2, postContent, postContent2 } =
    getPostContentFields(post, locale);

  let tagsDisplay: ReactElement[];
  if (post.tagNames && post.tagNames.length > 0) {
    let tagsArray = [post.tagNames];
    if (post.tagNames.indexOf(",") > -1) tagsArray = post.tagNames.split(",");
    tagsDisplay = tagsArray.map((tag, index) => (
      <a
        key={index}
        href={"/tag/" + tag}
      >
        {" #" + tag}
      </a>
    ));
  }

  return (
    <React.Fragment>
      <div className={styles.newsletterLayout}>
        <div className={styles.header}>
          <p>Published {post.post_date ? formateDate(post.post_date) : ""}</p>
          <h2>{postTitle}</h2>
          <div className={styles.linksContainer}>
            <div className={styles.socialMediaLinks}>
              <Share description={post.post_excerpt} />
            </div>
            <p>
              <a href={`/category/${post.categoryName}`}>
                #{post.categoryName}
              </a>
              {tagsDisplay}
            </p>
          </div>
          {post?.post_image?.indexOf("null") === -1 && (
            <div className={styles.imageWrapper}>
              <ImageWithFallback
                src={generateFileServerSrc(post.post_image)}
                alt={post.post_title}
                title={post.post_title}
              />
            </div>
          )}
        </div>
        <div className={styles.contentContainer}>
          <div
            className={styles.topExcerpt + " " + styles.excerpt}
            dangerouslySetInnerHTML={{
              __html: postExcerpt.replace(/(?:\r\n|\r|\n)/g, "<br>"),
            }}
          ></div>
          <div
            className={styles.bottomExcerpt + " " + styles.excerpt}
            dangerouslySetInnerHTML={{
              __html: postExcerpt2,
            }}
          ></div>
          <div
            className={styles.topContent + " " + styles.content}
            dangerouslySetInnerHTML={{
              __html: postContent.replace(/(?:\r\n|\r|\n)/g, "<br>"),
            }}
          ></div>
          <div className={styles.image}>
            <img
              src={generateFileServerSrc(post.post_image_2)}
              alt={post.post_title}
              title={post.post_title}
            />
          </div>

          <div
            className={styles.bottomContent + " " + styles.content}
            dangerouslySetInnerHTML={{
              __html: postContent2,
            }}
          ></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostPageNewsletterLayout;
