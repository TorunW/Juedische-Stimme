import React, { ReactElement } from 'react'
import styles from '../posts/ListStyles.module.css';
import formateDate from 'helpers/formateDate';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import Image from 'next/image';

const PostPageArticleLayout = ({post,locale}) => {


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

    return (
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
                    <div className={styles.image}>
                    <Image
                        src={generateImageUrl(post.post_image_2)}
                        alt={post.post_title}
                        title={post.post_title}
                        layout='fill'
                        objectFit='cover'
                    />
                    </div>
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
        </React.Fragment>
    )
}

export default PostPageArticleLayout