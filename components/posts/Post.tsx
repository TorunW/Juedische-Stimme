import React from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import { useSelector } from 'store/hooks';
import formateDate from 'helpers/formateDate';
import { GeneratePostUrl } from 'helpers/generatePostUrl';
import styles from 'styles/Posts.module.css';

type Props = {
  post: any;
};

const Post: React.FC<Props> = ({ post }) => {
  const { locale } = useSelector((state) => state.languages);

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
  if (post.phrase) {
    postContent = postContent.replace(/<\/?[^>]+(>|$)/g, '');

    const phraseIndexInText = post.post_content.indexOf(post.phrase);

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
          .split(post.phrase)
          .join(`<b>${post.phrase}</b>`) +
        '...';
    }
  } else postContent = postContent.substring(startIndex, endIndex);

  return (
    <article className={styles.post}>
      <div className={styles.imageWrapper}>
        <img
          // src={generateImageUrl(post.post_image)}
          src='testpic.jpg'
          width='767'
          height='431'
        />
      </div>

      <div className={styles.date}>
        {post.post_date ? formateDate(post.post_date) : ''}
      </div>

      <a
        href={'/' + GeneratePostUrl(post.post_name)}
        className={styles.postTitle}
      >
        <h3>{postTitle} </h3>
      </a>

      <a href={`/category/${post.categoryName}`} className={styles.tags}>
        #{post.categoryName}
      </a>
      <div
        className={styles.postPreview}
        dangerouslySetInnerHTML={{ __html: postContent }}
      ></div>
    </article>
  );
};

export default Post;
