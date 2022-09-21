import Image from 'next/image';
import React from 'react';
import styles from './ListStyles.module.css';
import background from 'styles/images/memberspage-bg.jpg';
import MembershipForm from '../forms/MembershipForm';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import { getPostContentFields } from 'helpers/getPostContentFields';

const PostPageMemberFormLayout = ({ post, locale }) => {
  const { postTitle, postExcerpt, postExcerpt2, postContent, postContent2 } = getPostContentFields(post, locale)
  return (
    <React.Fragment>
      <div style={{position:"relative",minHeight:"700px",zIndex:1}}>
        <Image src={generateImageUrl(post.post_image)} layout='fill' objectFit='cover' />
      </div>
      <div className={styles.memberFormLayout} style={{position:"absolute",zIndex:2, top:100,left:0,width:"100%", display:"flex"}}>
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
