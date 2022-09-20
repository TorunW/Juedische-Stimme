import React from 'react';
import DonationsForm from 'components/forms/DonationsForm';
import Image from 'next/image';
import styles from './ListStyles.module.css';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import { getPostContentFields } from 'helpers/getPostContentFields';

const PostPageDonationFormLayout = ({ post, locale }) => {
  const { postTitle, postExcerpt, postExcerpt2, postContent, postContent2 } =
    getPostContentFields(post, locale);

  return (
    <React.Fragment>
      <div className={styles.donationFormLayout}>
        {/* <Image
          src={generateImageUrl(post.post_image)}
          alt='donations-page-background'
          title='donations-page-background'
          layout='fill'
          objectFit='cover'
        /> */}
        <div className={styles.pageContainer}>
          <div className={styles.contentContainer}>
            <h2>Spenden</h2>
            <div
              dangerouslySetInnerHTML={{ __html: postContent }}
              className={styles.content}
            ></div>
          </div>
          <div className={styles.formContainer}>
            <DonationsForm stripeProducts={post.stripeProducts} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostPageDonationFormLayout;
