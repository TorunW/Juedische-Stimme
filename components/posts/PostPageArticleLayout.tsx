import React, { ReactElement } from "react";
import styles from "../posts/ListStyles.module.css";
import formateDate from "helpers/formateDate";
import { generateImageUrl } from "helpers/imageUrlHelper";
import Image from "next/image";
import { getPostContentFields } from "helpers/getPostContentFields";
import PostPageEmbededContent from "./PostPageEmbededContent";

const PostPageArticleLayout = ({ post, locale }) => {
  const { postTitle, postExcerpt, postExcerpt2, postContent, postContent2 } =
    getPostContentFields(post, locale);

  console.log(post);

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

  return (
    <React.Fragment>
      <div className={styles.articleLayout}>
        <div className={styles.header}>
          <div className={styles.contentWrapper}>
            <h2>{postTitle}</h2>
            <div className={styles.imageWrapper}>
              <Image
                src={generateImageUrl(post.post_image)}
                alt={post.post_title}
                title={post.post_title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className={styles.linksContainer}>
          <p>Published {post.post_date ? formateDate(post.post_date) : ""}</p>

          <p>
            <a href={`/category/${post.categoryName}`}>#{post.categoryName}</a>
            {tagsDisplay}
          </p>
          <div className={styles.socialMediaLinks}></div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.topWrapper}>
            <div
              className={styles.topExcerpt + " " + styles.excerpt}
              dangerouslySetInnerHTML={{
                __html: postExcerpt.replace(/(?:\r\n|\r|\n)/g, "<br>"),
              }}
            ></div>
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
                  src={generateImageUrl(post.post_image_2)}
                  alt={post.post_title}
                  title={post.post_title}
                  layout="fill"
                  objectFit="cover"
                  onErrorCapture={onSecondImageErrorCapture}
                />
              </div>
              <div
                className={styles.bottomExcerpt + " " + styles.excerpt}
                dangerouslySetInnerHTML={{
                  __html: postExcerpt2,
                }}
              ></div>
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

          {post.post_embed_script && post.post_embed_script !== "null" ? (
            <PostPageEmbededContent
              script={post.post_embed_script}
              html={post.post_embed_html}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostPageArticleLayout;
