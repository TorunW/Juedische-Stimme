import React, { ReactElement, useEffect, useState } from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import { useSelector } from 'store/hooks';
import formateDate from 'helpers/formateDate';
import { GeneratePostUrl } from 'helpers/generatePostUrl';
import styles from './Styles.module.css';
import axios from 'axios';
import trimStringToLastSpace from 'helpers/trimStringToLastSpace';
import Image from 'next/image';
import Link from 'next/link';
import Placeholder from '../placeholder/Placeholder';
// import BlurringImage from '../BlurringImage';

type Props = {
  post: any;
  phrase?: string;
};

const Post: React.FC<Props> = ({ post, phrase }) => {
  const { locale } = useSelector((state) => state.languages);
  // const [ imageData, setImageData ] = useState(null)

  // useEffect(() => {
  //   if (imageData === null && post.post_image !== null && post.post_image.indexOf('null') === -1) fetchPlaceholderImage()
  // },[])

  // function fetchPlaceholderImage(){
  //   axios({
  //     method: 'post',
  //     url: `/api/galleryimage/placeholder`,
  //       data:{
  //         uri:post.post_image,
  //         host:window.location.host,
  //         port:window.location.port
  //       }
  //   }).then((response) => {
  //     setImageData(response.data)
  //   }, (error) => {
  //       console.log(error, "ERROR on add tag to post");
  //   });
  // }

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

  // let textLength = 600;
  // let startIndex = 0,
  //   endIndex = textLength;
  // if we have a phrase - search phrase, i.e if this is search page, we will search for the phrase inside the content
  // if (phrase) {

  //   postContent = postContent.replace(/<\/?[^>]+(>|$)/g, '');

  //   const phraseIndexInText = post.post_content.indexOf(post.phrase);

  //   if (phraseIndexInText > -1) {
  //     startIndex = phraseIndexInText - textLength / 2;
  //     if (startIndex < 0) startIndex = 0;

  //     endIndex = phraseIndexInText + textLength / 2;
  //     if (endIndex > post.post_content.length - 1)
  //       endIndex = post.post_content.length;

  //     postContent =
  //       '...' +
  //       postContent
  //         .toLowerCase()
  //         .split(post.phrase)
  //         .join(`<b>${post.phrase}</b>`) +
  //       '...';
  //   }
  // } else postContent = postContent.substring(startIndex, endIndex);

  // let blurringImageDisplay: ReactElement;
  // if (imageData !== null && imageData.svg.length > 0 && imageData.img ){
  //   console.log(imageData.img, " IMG ")
  //   blurringImageDisplay = <BlurringImage svg={imageData.svg} img={imageData.img} />
  // }

  return (
    <article className={styles.post} data-testid='post-container'>
      <div className={styles.imageWrapper}>
        <Image
          src={generateImageUrl(post.post_image)}
          alt={post.post_title}
          title={post.post_title}
          layout='fill'
          objectFit='cover'
        />
      </div>

      <div className={styles.date}>
        {post.post_date ? formateDate(post.post_date) : ''}
      </div>

      <Link href={'/' + GeneratePostUrl(post.post_name)}>
        <a  className={styles.postTitle}>
          <h4>{postTitle} </h4>
        </a>
      </Link>

      <a href={`/category/${post.categoryName}`} className={styles.tags}>
        #{post.categoryName}
      </a>
      <div
        className={styles.postPreview}
        dangerouslySetInnerHTML={{
          __html:
            postExcerpt && postExcerpt !== null
              ? postExcerpt
              : `${trimStringToLastSpace(postContent.substring(0, 600))} [...]`,
        }}
      ></div>
    </article>
  );
};

export default Post;
