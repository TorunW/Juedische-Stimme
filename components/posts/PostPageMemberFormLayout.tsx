import Image from 'next/image';
import React from 'react';
import styles from './ListStyles.module.css';
import background from '../../styles/images/memberspage-bg.jpg';
import MembershipForm from '../forms/MembershipForm';

const PostPageMemberFormLayout = ({ post, locale }) => {
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
      <div className={styles.memberFormLayout}>
        <Image src={background} layout='fill' objectFit='fill' />

        <div className={styles.contentContainer}>
          <h2>Mitgliedsantrag</h2>
          <div
            dangerouslySetInnerHTML={{ __html: postContent }}
            className={styles.content}
          ></div>
        </div>
        <div className={styles.form}>
          <MembershipForm />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostPageMemberFormLayout;
