import React, { ReactElement } from 'react';
import styles from '../posts/ListStyles.module.css';
import { getPostContentFields } from 'helpers/getPostContentFields';
import { Container } from '../atoms/Container';

export default function PostPageInfoLayout({ post, locale }) {
  const { postTitle, postContent } = getPostContentFields(post, locale);

  return (
    <React.Fragment>
      <div className={styles.infoLayout}>
        <Container>
          <h1>{postTitle}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: postContent.replace(/(?:\r\n|\r|\n)/g, '<br>'),
            }}
          ></div>
        </Container>
      </div>
    </React.Fragment>
  );
}
