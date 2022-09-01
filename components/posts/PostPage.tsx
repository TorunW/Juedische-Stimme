import formateDate from 'helpers/formateDate';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import Image from 'next/image';
import React, { ReactElement } from 'react';
import { useSelector } from 'store/hooks';
import styles from '../posts/ListStyles.module.css';
import ShareLink from 'react-facebook-share-link';

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

    console.log(post.post_name);

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
                <ShareLink
                  link={`https://juedische-stimme.com/${post.post_name}`}
                >
                  {(link) => (
                    <a href={link} target='_blank'>
                      <svg
                        width='30'
                        height='30'
                        viewBox='0 0 30 30'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M26.125 2.5H3.875C3.51033 2.5 3.16059 2.64487 2.90273 2.90273C2.64487 3.16059 2.5 3.51033 2.5 3.875V26.125C2.5 26.3056 2.53557 26.4844 2.60467 26.6512C2.67377 26.818 2.77505 26.9696 2.90273 27.0973C3.03041 27.225 3.18199 27.3262 3.34881 27.3953C3.51563 27.4644 3.69443 27.5 3.875 27.5H15.85V17.8125H12.6V14.0625H15.85V11.25C15.7827 10.5897 15.8606 9.92266 16.0784 9.29567C16.2962 8.66868 16.6485 8.09693 17.1106 7.62051C17.5727 7.1441 18.1335 6.77455 18.7535 6.5378C19.3736 6.30104 20.038 6.20281 20.7 6.25C21.6729 6.24401 22.6454 6.2941 23.6125 6.4V9.775H21.625C20.05 9.775 19.75 10.525 19.75 11.6125V14.025H23.5L23.0125 17.775H19.75V27.5H26.125C26.3056 27.5 26.4844 27.4644 26.6512 27.3953C26.818 27.3262 26.9696 27.225 27.0973 27.0973C27.225 26.9696 27.3262 26.818 27.3953 26.6512C27.4644 26.4844 27.5 26.3056 27.5 26.125V3.875C27.5 3.69443 27.4644 3.51563 27.3953 3.34881C27.3262 3.18199 27.225 3.03041 27.0973 2.90273C26.9696 2.77505 26.818 2.67377 26.6512 2.60467C26.4844 2.53557 26.3056 2.5 26.125 2.5V2.5Z' />
                      </svg>
                    </a>
                  )}
                </ShareLink>

                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M15 8.75C13.7639 8.75 12.5555 9.11656 11.5277 9.80331C10.4999 10.4901 9.6988 11.4662 9.22575 12.6082C8.75271 13.7503 8.62893 15.0069 8.87009 16.2193C9.11125 17.4317 9.7065 18.5453 10.5806 19.4194C11.4547 20.2935 12.5683 20.8888 13.7807 21.1299C14.9931 21.3711 16.2497 21.2473 17.3918 20.7742C18.5338 20.3012 19.5099 19.5001 20.1967 18.4723C20.8834 17.4445 21.25 16.2361 21.25 15C21.25 13.3424 20.5915 11.7527 19.4194 10.5806C18.2473 9.40848 16.6576 8.75 15 8.75ZM15 18.75C14.2583 18.75 13.5333 18.5301 12.9166 18.118C12.2999 17.706 11.8193 17.1203 11.5355 16.4351C11.2516 15.7498 11.1774 14.9958 11.3221 14.2684C11.4667 13.541 11.8239 12.8728 12.3483 12.3483C12.8728 11.8239 13.541 11.4667 14.2684 11.3221C14.9958 11.1774 15.7498 11.2516 16.4351 11.5355C17.1203 11.8193 17.706 12.2999 18.118 12.9166C18.5301 13.5333 18.75 14.2583 18.75 15C18.75 15.9946 18.3549 16.9484 17.6517 17.6517C16.9484 18.3549 15.9946 18.75 15 18.75ZM21.25 7.5C21.0028 7.5 20.7611 7.57331 20.5555 7.71066C20.35 7.84801 20.1898 8.04324 20.0951 8.27165C20.0005 8.50005 19.9758 8.75139 20.024 8.99386C20.0723 9.23634 20.1913 9.45907 20.3661 9.63388C20.5409 9.8087 20.7637 9.92775 21.0061 9.97598C21.2486 10.0242 21.4999 9.99946 21.7284 9.90485C21.9568 9.81024 22.152 9.65002 22.2893 9.44446C22.4267 9.2389 22.5 8.99723 22.5 8.75C22.5 8.41848 22.3683 8.10054 22.1339 7.86612C21.8995 7.6317 21.5815 7.5 21.25 7.5ZM27.425 10.3C27.4043 9.23178 27.2014 8.17493 26.825 7.175C26.476 6.26508 25.9395 5.43874 25.2504 4.74962C24.5613 4.06051 23.7349 3.52402 22.825 3.175C21.8251 2.79862 20.7682 2.59571 19.7 2.575C18.4875 2.5 18.0875 2.5 15 2.5C11.9125 2.5 11.5125 2.5 10.3 2.575C9.23178 2.59571 8.17493 2.79862 7.175 3.175C6.26508 3.52402 5.43874 4.06051 4.74962 4.74962C4.06051 5.43874 3.52402 6.26508 3.175 7.175C2.79862 8.17493 2.59571 9.23178 2.575 10.3C2.5 11.525 2.5 11.925 2.5 15C2.5 18.075 2.5 18.475 2.575 19.7C2.59571 20.7682 2.79862 21.8251 3.175 22.825C3.52402 23.7349 4.06051 24.5613 4.74962 25.2504C5.43874 25.9395 6.26508 26.476 7.175 26.825C8.17493 27.2014 9.23178 27.4043 10.3 27.425C11.55 27.425 11.9125 27.5 15 27.5C18.0875 27.5 18.4875 27.5 19.7 27.425C20.7682 27.4043 21.8251 27.2014 22.825 26.825C23.7349 26.476 24.5613 25.9395 25.2504 25.2504C25.9395 24.5613 26.476 23.7349 26.825 22.825C27.2014 21.8251 27.4043 20.7682 27.425 19.7C27.425 18.45 27.5 18.075 27.5 15C27.5 11.925 27.5 11.525 27.425 10.3ZM24.925 19.5875C24.9031 20.3808 24.7554 21.1655 24.4875 21.9125C24.266 22.5029 23.9159 23.0367 23.4625 23.475C23.0268 23.9286 22.492 24.2751 21.9 24.4875C21.1513 24.7664 20.3613 24.9185 19.5625 24.9375C18.3875 24.9375 18.025 25 14.9875 25C11.95 25 11.6 25 10.425 25C9.62752 24.9794 8.83844 24.8317 8.0875 24.5625C7.49707 24.341 6.96334 23.9909 6.525 23.5375C6.07144 23.1018 5.7249 22.567 5.5125 21.975C5.23476 21.2303 5.08269 20.4446 5.0625 19.65C5.0625 18.4 5.0625 18.0875 5.0625 15.0625C5.0625 12.0375 5.0625 11.675 5.0625 10.475C5.08405 9.67651 5.23605 8.88692 5.5125 8.1375C5.7282 7.55079 6.07442 7.02078 6.525 6.5875C6.96072 6.13394 7.49551 5.7874 8.0875 5.575C8.83624 5.29612 9.62624 5.14403 10.425 5.125C11.6 5 11.9625 5 15 5C18.0375 5 18.4 5 19.575 5C20.3777 5.02041 21.1716 5.17243 21.925 5.45C22.5117 5.6657 23.0417 6.01192 23.475 6.4625C23.9286 6.89822 24.2751 7.43301 24.4875 8.025C24.7935 8.7857 24.9668 9.59323 25 10.4125C25 11.6625 25.0625 11.975 25.0625 15C25.0625 18.025 25 18.3875 25 19.5875H24.925Z' />
                </svg>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M19 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H19C19.7956 20 20.5587 19.6839 21.1213 19.1213C21.6839 18.5587 22 17.7956 22 17V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM5 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7L12 11.88L4 7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6ZM20 17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H5C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V9.28L11.48 13.85C11.632 13.9378 11.8045 13.984 11.98 13.984C12.1555 13.984 12.328 13.9378 12.48 13.85L20 9.28V17Z'
                    fill='black'
                  />
                </svg>
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

    postDisplay = (
      <React.Fragment>
        {headerDisplay}
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

        <div className={styles.navigationContainer}>
          {post.nextPostName !== null ? (
            <a href={'/' + post.nextPostName.split('#').join(':__--__:')}>
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
              <div>{post.nextPostName} </div>
            </a>
          ) : (
            ''
          )}
          {post.previousPostName !== null ? (
            <a href={'/' + post.previousPostName.split('#').join(':__--__:')}>
              <div>{post.previousPostName} </div>
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
        post.categoryName === 'Aktuelles' || post.categoryName === 'Algemmein'
          ? styles.firstLayout
          : styles.secondLayout
      }
    >
      {postDisplay}
    </div>
  );
}

export default Post;
