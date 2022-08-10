import React from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import { useSelector } from 'store/hooks';
import styles from 'styles/Posts.module.css';
import formateDate from 'helpers/formateDate';

function Posts(props) {
  const { locale } = useSelector((state) => state.languages);

  return (
    <div
      className={
        props.title === 'Newsletter' ? styles.threeColPage : styles.twoColPage
      }
    >
      <h1>{props.title}</h1>
      <div className={styles.postContainer}>
        {props.posts.map((post, index) => {
          let postTitle = post.post_title,
            postExcerpt = post.post_excerpt,
            postContent = post.post_content;

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

          let textLength = 600;
          let startIndex = 0,
            endIndex = textLength;

          // if we have a phrase - search phrase, i.e if this is search page, we will search for the phrase inside the content
          if (props.phrase) {
            postContent = postContent.replace(/<\/?[^>]+(>|$)/g, '');

            const phraseIndexInText = post.post_content.indexOf(props.phrase);

            if (phraseIndexInText > -1) {
              startIndex = phraseIndexInText - textLength / 2;
              if (startIndex < 0) startIndex = 0;

              endIndex = phraseIndexInText + textLength / 2;
              if (endIndex > post.post_content.length - 1)
                endIndex = post.post_content.length;

              postContent =
                '...' +
                postContent
                  .toLowerCase()
                  .split(props.phrase)
                  .join(`<b>${props.phrase}</b>`) +
                '...';
            }
          } else postContent = postContent.substring(startIndex, endIndex);

          return (
            <article key={index} className={styles.post}>
              <img src={generateImageUrl(post.post_image)} />
              <div className={styles.date}>
                {post.post_date ? formateDate(post.post_date) : ''}
              </div>
              <h2>
                <a href={'/' + post.post_name}>{postTitle}</a>
              </h2>
              <h4>
                <a href={`/category/${post.categoryName}`}>
                  {post.categoryName}
                </a>
              </h4>
              <div
                className={styles.postPreview}
                dangerouslySetInnerHTML={{ __html: postContent }}
              ></div>
            </article>
          );
        })}
      </div>
      <div className='btnContainer'>
        <button>
          Weitere {props.title === 'Aktuelles' ? 'Artikeln' : props.title} lesen
        </button>
      </div>
    </div>
  );
}
export default Posts;
