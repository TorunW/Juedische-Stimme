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
