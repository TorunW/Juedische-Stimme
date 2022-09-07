import React from 'react';
import DonationsForm from '../forms/DonationsForm';
import background from 'styles/images/donations-bg.jpg';
import Image from 'next/image';
import styles from './ListStyles.module.css';

const PostPageDonationFormLayout = ({ post, locale }) => {
  let postTitle = post.post_title,
    postExcerpt = post.post_excerpt,
    postExcerpt2 = post.post_excerpt_2,
    postContent = post.post_content,
    postContent2 = post.post_content_2;

  if (locale !== null) {
    postTitle = post[`post_title_translation_${locale}`]
      ? post[`post_title_translation_${locale}`]
      : post.post_title;
    postExcerpt = post[`post_excerpt_translation_${locale}`]
      ? post[`post_excerpt_translation_${locale}`]
      : post.post_excerpt;
    postExcerpt2 = post[`post_excerpt_2_translation_${locale}`]
      ? post[`post_excerpt_2_translation_${locale}`]
      : post.post_excerpt;
    postContent = post[`post_content_translation_${locale}`]
      ? post[`post_content_translation_${locale}`]
      : post.post_content;
    postContent2 = post[`post_content_2_translation_${locale}`]
      ? post[`post_content_2_translation_${locale}`]
      : post.post_content;
  }

  return (
    <React.Fragment>
      <div className={styles.donationFormLayout}>
        {' '}
        <Image
          src={background}
          alt='donations-page-background'
          title='donations-page-background'
          layout='fill'
          objectFit='cover'
        />
        <div className={styles.contentContainer}>
          <h2>Spenden</h2>
          <div
            dangerouslySetInnerHTML={{ __html: postContent }}
            className={styles.content}
          ></div>
        </div>
        <div className={styles.form}>
          <DonationsForm />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostPageDonationFormLayout;
