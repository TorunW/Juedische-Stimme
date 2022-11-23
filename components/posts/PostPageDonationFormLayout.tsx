import DonationsForm from "components/forms/DonationsForm";
import { generateFileServerSrc } from "helpers/generateFileServerSrc";
import { getPostContentFields } from "helpers/getPostContentFields";
import Image from "next/image";
import React from "react";
import styles from "./ListStyles.module.css";

const PostPageDonationFormLayout = ({ post, locale }) => {
  const { postTitle, postContent } = getPostContentFields(post, locale);

  return (
    <React.Fragment>
      <div className={styles.donationFormLayout}>
        <Image
          src={generateFileServerSrc(post.post_image)}
          alt="donations-page-background"
          title="donations-page-background"
          layout="fill"
          objectFit="cover"
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
