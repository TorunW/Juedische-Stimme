import React, { ReactElement } from "react";
import styles from "../posts/ListStyles.module.css";
import formateDate from "helpers/formateDate";
import { generateImageUrl } from "helpers/imageUrlHelper";
import { getPostContentFields } from "helpers/getPostContentFields";
import trimStringToLastSpace from "helpers/trimStringToLastSpace";
import Share from "helpers/shareToSocialMedia";
import { Container } from "../atoms/Container";
import { PostImage } from "./PostImage";

export default function PostPageLegacyLayout({ post, locale }) {
  const { postTitle, postContent } = getPostContentFields(post, locale);

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
      <div className={styles.legacyLayout}>
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <p>Published {post.post_date ? formateDate(post.post_date) : ""}</p>
            <p>
              {!!post.categoryName && (
                <a href={`/category/${post.categoryName}`}>
                  #{post.categoryName}
                </a>
              )}
              {tagsDisplay}
            </p>
            <div className={styles.socialMediaLinks}>
              <Share description={trimStringToLastSpace(post.post_content)} />
            </div>

            <h2>{postTitle}</h2>
          </div>
        </div>

        {post.post_image && post.post_image.indexOf("null") === -1 && (
          <Container>
            <div style={{ width: "100%", textAlign: "center" }}>
              <PostImage
                image={generateImageUrl(post.post_image)}
                alt={post.post_title}
                title={post.post_title}
                style={{ margin: "20px auto" }}
              />
            </div>
          </Container>
        )}
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: postContent.replace(/(?:\r\n|\r|\n)/g, "<br>"),
          }}
        ></div>
      </div>
    </React.Fragment>
  );
}
