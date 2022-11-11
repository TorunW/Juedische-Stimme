import Image from "next/image";
import React from "react";
import styles from "./ListStyles.module.css";
import MembershipForm from "../forms/MembershipForm";
import { generateImageUrl } from "helpers/imageUrlHelper";
import { getPostContentFields } from "helpers/getPostContentFields";
import { generateFileServerSrc } from "helpers/generateFileServerSrc";

const PostPageMemberFormLayout = ({ post, locale }) => {
  const { postTitle, postContent } = getPostContentFields(post, locale);
  return (
    <React.Fragment>
      <div className={styles.memberFormLayout}>
        <img
          src={generateFileServerSrc(post.post_image)}
          alt="membership-page-background"
          title="membership-page-background"
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
