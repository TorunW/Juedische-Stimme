import Image from 'next/image';
import React from 'react';
import styles from './ListStyles.module.css';
import background from 'styles/images/memberspage-bg.jpg';
import MembershipForm from '../forms/MembershipForm';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import { getPostContentFields } from 'helpers/getPostContentFields';

const PostPageMemberFormLayout = ({ post, locale }) => {
  const { postTitle, postExcerpt, postExcerpt2, postContent, postContent2 } =
    getPostContentFields(post, locale);
  return (
    <React.Fragment>
      <div className={styles.memberFormLayout}>
        <Image
          src={generateImageUrl(post.post_image)}
          alt='membership-page-background'
          title='membership-page-background'
          layout='fill'
          objectFit='cover'
        />
        <div className={styles.pageContainer}>
          <div className={styles.contentContainer}>
            <h2>Mitgliedsantrag</h2>
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
