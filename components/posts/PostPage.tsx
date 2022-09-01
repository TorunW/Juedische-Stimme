import formateDate from 'helpers/formateDate';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import Image from 'next/image';
import React, { ReactElement } from 'react';
import { useSelector } from 'store/hooks';
import styles from '../posts/ListStyles.module.css';

function Post({ post }) {
  const { locale } = useSelector((state) => state.languages);

  /* TO DO'S
     - DISPLAY TAGS IN A BETTER WAY
     - MAKE A BETTER NO POST FOUND PAGE! maybe even split to a different compoent -> show suggested posts? show helpful links?
     - show the NEXT POST / PREVIOUS POST buttons, get the next post name, previous post name in the query!
    */

  let postDisplay: ReactElement;
  if (post && post !== null) {
    let postTitle = post.post_title,
      postExcerpt = post.post_excerpt,
      postContent = post.post_content,
      postExcerpt2 = post.post_excerpt_2,
      postContent2 = post.post_content_2;

    if (locale !== null) {
      postTitle = post[`post_title_translation_${locale}`]
        ? post[`post_title_translation_${locale}`]
        : post.post_title;
      postExcerpt = post[`post_excerpt_translation_${locale}`]
        ? post[`post_excerpt_translation_${locale}`]
        : post.post_excerpt;
      postContent = post[`post_content_translation_${locale}`]
        ? post[`post_content_translation_${locale}`]
        : post.post_content;
    }

    let tagsDisplay: ReactElement[];
    if (post.tagNames && post.tagNames.length > 0) {
      let tagsArray = [post.tagNames];
      if (post.tagNames.indexOf(',') > -1) tagsArray = post.tagNames.split(',');
      tagsDisplay = tagsArray.map((tag, index) => (
        <a key={index} href={'/tag/' + tag}>
          {' <' + tag + '> '}
        </a>
      ));
    }

    console.log(post.post_date);

    postDisplay = (
      <React.Fragment>
        <div className={styles.header}>
          <div className={styles.contentWrapper}>
            <h2>{postTitle}</h2>
            <div className={styles.imageWrapper}>
              <Image
                src={generateImageUrl(post.post_image)}
                alt={post.post_title}
                title={post.post_title}
                layout='fill'
                objectFit='cover'
              />
            </div>
          </div>
        </div>

        <div className={styles.linksContainer}>
          <p>Published {post.post_date ? formateDate(post.post_date) : ''}</p>
          <p>
            <a href={`/category/${post.categoryName}`}>#{post.categoryName}</a>
            {tagsDisplay}
          </p>
          <div className={styles.socialMediaLinks}></div>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.topWrapper}>
            <div
              className={styles.topExcerpt + ' ' + styles.excerpt}
              dangerouslySetInnerHTML={{
                __html: postExcerpt.replace(/(?:\r\n|\r|\n)/g, '<br>'),
              }}
            ></div>
            <div
              className={styles.topContent + ' ' + styles.content}
              dangerouslySetInnerHTML={{
                __html: postContent.replace(/(?:\r\n|\r|\n)/g, '<br>'),
              }}
            ></div>
          </div>
          <div className={styles.middleWrapper}>
            <div className={styles.image}>
            <Image
                src={generateImageUrl(post.post_image_2)}
                alt={post.post_title}
                title={post.post_title}
                layout='fill'
                objectFit='cover'
              />
            </div>

            <div
              className={styles.bottomExcerpt + ' ' + styles.excerpt}
              dangerouslySetInnerHTML={{
                __html: postExcerpt2,
              }}
            ></div>
          </div>

          <div className={styles.bottomWrapper}>
            <div
              className={styles.bottomContent + ' ' + styles.content}
              dangerouslySetInnerHTML={{
                __html: postContent2,
              }}
            ></div>
          </div>
        </div>

        <div className={styles.navigationContainer}>
          {post.nextPostName !== null ? (
            <React.Fragment>
              next:{' '}
              <a href={'/' + post.nextPostName.split('#').join(':__--__:')}>
                {post.nextPostName}
              </a>
            </React.Fragment>
          ) : (
            ''
          )}
          {post.previousPostName !== null ? (
            <React.Fragment>
              previous:{' '}
              <a href={'/' + post.previousPostName.split('#').join(':__--__:')}>
                {post.previousPostName}
              </a>
            </React.Fragment>
          ) : (
            ''
          )}
        </div>
      </React.Fragment>
    );
  } else {
    postDisplay = (
      <React.Fragment>
        <h4>No Post Found!</h4>
      </React.Fragment>
    );
  }
  return (
    <div
      id='post-view'
      className={
        post.categoryName === 'Aktuelles'
          ? styles.firstLayout
          : post.categoryName === 'Newsletter'
          ? styles.secondLayout
          : ''
      }
    >
      {postDisplay}
    </div>
  );
}

export default Post;
