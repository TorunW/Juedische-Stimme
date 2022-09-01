import formateDate from 'helpers/formateDate';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import Image from 'next/image';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'store/hooks';
import styles from '../posts/ListStyles.module.css';
import axios from 'axios';
import Share from 'helpers/shareToSocialMedia';

function Post({ post }) {
  const { locale } = useSelector((state) => state.languages);
  const [nextPost, setNextPost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);

  useEffect(() => {
    getNextPrevPostNames();
  }, []);

  async function getNextPrevPostNames() {
    const nextPostResponse = await axios.post(
      `/api/posts/${post.postId}/nextpost`,
      { categoryId: post.categoryId }
    );
    setNextPost(nextPostResponse.data);
    const prevPostResponse = await axios.post(
      `/api/posts/${post.postId}/prevpost`,
      { categoryId: post.categoryId }
    );
    setPrevPost(prevPostResponse.data);
  }

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
          {' #' + tag}
        </a>
      ));
    }

    let headerDisplay;
    if (
      post.categoryName === 'Aktuelles' ||
      post.categoryName === 'Allgemein'
    ) {
      headerDisplay = (
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
              <a href={`/category/${post.categoryName}`}>
                #{post.categoryName}
              </a>
              {tagsDisplay}
            </p>
            <div className={styles.socialMediaLinks}></div>
          </div>
        </React.Fragment>
      );
    } else {
      headerDisplay = (
        <React.Fragment>
          <div className={styles.header}>
            <p>Published {post.post_date ? formateDate(post.post_date) : ''}</p>
            <h2>{postTitle}</h2>
            <div className={styles.linksContainer}>
              <div className={styles.socialMediaLinks}>
                <Share description={post.post_excerpt} />
              </div>
              <p>
                <a href={`/category/${post.categoryName}`}>
                  #{post.categoryName}
                </a>
                {tagsDisplay}
              </p>
            </div>
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
        </React.Fragment>
      );
    }

    let contentDisplay;
    if (
      post.categoryName === 'Aktuelles' ||
      post.categoryName === 'Allgemein'
    ) {
      contentDisplay = (
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
            <div className={styles.image}></div>

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
      );
    } else {
      contentDisplay = (
        <div className={styles.contentContainer}>
          <div
            className={styles.topExcerpt + ' ' + styles.excerpt}
            dangerouslySetInnerHTML={{
              __html: postExcerpt.replace(/(?:\r\n|\r|\n)/g, '<br>'),
            }}
          ></div>
          <div
            className={styles.bottomExcerpt + ' ' + styles.excerpt}
            dangerouslySetInnerHTML={{
              __html: postExcerpt2,
            }}
          ></div>
          <div
            className={styles.topContent + ' ' + styles.content}
            dangerouslySetInnerHTML={{
              __html: postContent.replace(/(?:\r\n|\r|\n)/g, '<br>'),
            }}
          ></div>
          <div className={styles.image}>IMAGE</div>

          <div
            className={styles.bottomContent + ' ' + styles.content}
            dangerouslySetInnerHTML={{
              __html: postContent2,
            }}
          ></div>
        </div>
      );
    }

    postDisplay = (
      <React.Fragment>
        {headerDisplay}

        {contentDisplay}
        <div className={styles.navigationContainer}>
          {nextPost !== null ? (
            <a href={'/' + nextPost.post_name}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M11.2899 11.9997L14.8299 8.4597C15.0162 8.27234 15.1207 8.01889 15.1207 7.7547C15.1207 7.49052 15.0162 7.23707 14.8299 7.0497C14.737 6.95598 14.6264 6.88158 14.5045 6.83081C14.3827 6.78004 14.252 6.75391 14.1199 6.75391C13.9879 6.75391 13.8572 6.78004 13.7354 6.83081C13.6135 6.88158 13.5029 6.95598 13.4099 7.0497L9.16994 11.2897C9.07622 11.3827 9.00182 11.4933 8.95105 11.6151C8.90028 11.737 8.87415 11.8677 8.87415 11.9997C8.87415 12.1317 8.90028 12.2624 8.95105 12.3843C9.00182 12.5061 9.07622 12.6167 9.16994 12.7097L13.4099 16.9997C13.5034 17.0924 13.6142 17.1657 13.736 17.2155C13.8579 17.2652 13.9883 17.2905 14.1199 17.2897C14.2516 17.2905 14.382 17.2652 14.5038 17.2155C14.6257 17.1657 14.7365 17.0924 14.8299 16.9997C15.0162 16.8123 15.1207 16.5589 15.1207 16.2947C15.1207 16.0305 15.0162 15.7771 14.8299 15.5897L11.2899 11.9997Z'
                  fill='black'
                />
              </svg>
              <div>{nextPost.post_title} </div>
            </a>
          ) : (
            ''
          )}
          {prevPost !== null ? (
            <a href={'/' + prevPost.post_name}>
              <div>{prevPost.post_title} </div>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M14.8299 11.2897L10.5899 7.0497C10.497 6.95598 10.3864 6.88158 10.2645 6.83081C10.1427 6.78004 10.012 6.75391 9.87994 6.75391C9.74793 6.75391 9.61723 6.78004 9.49537 6.83081C9.37351 6.88158 9.26291 6.95598 9.16994 7.0497C8.98369 7.23707 8.87915 7.49052 8.87915 7.7547C8.87915 8.01889 8.98369 8.27234 9.16994 8.4597L12.7099 11.9997L9.16994 15.5397C8.98369 15.7271 8.87915 15.9805 8.87915 16.2447C8.87915 16.5089 8.98369 16.7623 9.16994 16.9497C9.26338 17.0424 9.3742 17.1157 9.49604 17.1655C9.61787 17.2152 9.74834 17.2405 9.87994 17.2397C10.0115 17.2405 10.142 17.2152 10.2638 17.1655C10.3857 17.1157 10.4965 17.0424 10.5899 16.9497L14.8299 12.7097C14.9237 12.6167 14.9981 12.5061 15.0488 12.3843C15.0996 12.2624 15.1257 12.1317 15.1257 11.9997C15.1257 11.8677 15.0996 11.737 15.0488 11.6151C14.9981 11.4933 14.9237 11.3827 14.8299 11.2897Z'
                  fill='black'
                />{' '}
              </svg>
            </a>
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
        post.categoryName === 'Aktuelles' || post.categoryName === 'Allgemein'
          ? styles.firstLayout
          : styles.secondLayout
      }
    >
      {postDisplay}
    </div>
  );
}

export default Post;
