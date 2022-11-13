import React, { ReactElement } from "react";
import styles from "../posts/ListStyles.module.css";
import formateDate from "helpers/formateDate";
import { generateImageUrl } from "helpers/imageUrlHelper";
import Image from "next/image";
import { getPostContentFields } from "helpers/getPostContentFields";
import Share from "helpers/shareToSocialMedia";
import trimStringToLastSpace from "helpers/trimStringToLastSpace";
import { generateFileServerSrc } from "helpers/generateFileServerSrc";

const PostPageArticleLayout = ({ post, locale }) => {
  const { postTitle, postExcerpt, postExcerpt2, postContent, postContent2 } =
    getPostContentFields(post, locale);

  function onSecondImageErrorCapture(arrgs) {
    console.log(arrgs, " ERROR ");
  }

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

  console.log(postExcerpt2 == "null");

  return (
    <React.Fragment>
      <div className={styles.articleLayout}>
        <div className={styles.header}>
          <div className={styles.contentWrapper}>
            <h2>{postTitle}</h2>
            {!!post.post_image && (
              <div className={styles.imageWrapper}>
                <Image
                  src={generateFileServerSrc(post.post_image)}
                  alt={post.post_title}
                  title={post.post_title}
                  objectFit="cover"
                  layout="fill"
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles.linksContainer}>
          <p>Published {post.post_date ? formateDate(post.post_date) : ""}</p>

          <p>
            <a href={`/category/${post.categoryName}`}>#{post.categoryName}</a>
            {tagsDisplay}
          </p>
          <Share description={trimStringToLastSpace(post.post_content)} />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.topWrapper}>
            {!!postExcerpt && (
              <div
                className={styles.topExcerpt + " " + styles.excerpt}
                dangerouslySetInnerHTML={{
                  __html: postExcerpt.replace(/(?:\r\n|\r|\n)/g, "<br>"),
                }}
              ></div>
            )}
            <div
              className={styles.topContent + " " + styles.content}
              dangerouslySetInnerHTML={{
                __html: postContent.replace(/(?:\r\n|\r|\n)/g, "<br>"),
              }}
            ></div>
          </div>
          {post.post_image_2 !== null ? (
            <div className={styles.middleWrapper}>
              <div className={styles.image}>
                <Image
                  src={generateFileServerSrc(post.post_image_2)}
                  alt={post.post_title}
                  title={post.post_title}
                  onErrorCapture={onSecondImageErrorCapture}
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              {!!postExcerpt2 && (
                <div
                  className={styles.bottomExcerpt + " " + styles.excerpt}
                  dangerouslySetInnerHTML={{
                    __html: postExcerpt2,
                  }}
                ></div>
              )}
            </div>
          ) : (
            <div className={styles.middleWrapper}>
              <div
                className={styles.bottomExcerpt + " " + styles.excerpt}
                dangerouslySetInnerHTML={{
                  __html: postExcerpt2,
                }}
              ></div>
            </div>
          )}

          <div className={styles.bottomWrapper}>
            <div
              className={styles.bottomContent + " " + styles.content}
              dangerouslySetInnerHTML={{
                __html: postContent2,
              }}
            ></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostPageArticleLayout;
