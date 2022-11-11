import React from "react";
import DonationsForm from "components/forms/DonationsForm";
import Image from "next/image";
import styles from "./ListStyles.module.css";
import { generateImageUrl } from "helpers/imageUrlHelper";
import { getPostContentFields } from "helpers/getPostContentFields";
import { generateFileServerSrc } from "helpers/generateFileServerSrc";

const PostPageDonationFormLayout = ({ post, locale }) => {
  const { postTitle, postContent } = getPostContentFields(post, locale);

  return (
    <React.Fragment>
      <div className={styles.donationFormLayout}>
        <img
          src={generateFileServerSrc(post.post_image)}
          alt="donations-page-background"
          title="donations-page-background"
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
            <DonationsForm />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostPageDonationFormLayout;
