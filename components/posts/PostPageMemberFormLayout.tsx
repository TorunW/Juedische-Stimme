import { generateFileServerSrc } from "helpers/generateFileServerSrc";
import { getPostContentFields } from "helpers/getPostContentFields";
import React from "react";
import MembershipForm from "../forms/MembershipForm";
import styles from "./ListStyles.module.css";

const PostPageMemberFormLayout = ({ post, locale }) => {
  const { postTitle, postContent } = getPostContentFields(post, locale);
  return (
    <React.Fragment>
      <div className={styles.memberFormLayout}>
        <img
          src={generateFileServerSrc(post.post_image)}
          alt="membership-page-background"
          title="membership-page-background"
          style={{
            zIndex: 0,
            position: "absolute",
            top: 0,
            left: 0,
            width: "auto",
            height: "100%",
            minWidth: "100vw",
          }}
        />
        <div className={styles.pageContainer}>
          <div className={styles.contentContainer}>
            <h2>{postTitle}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: postContent }}
              className={styles.content}
            ></div>
          </div>

          <div className={styles.formContainer}>
            <MembershipForm />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostPageMemberFormLayout;
