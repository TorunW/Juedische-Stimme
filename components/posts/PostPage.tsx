import React, { ReactElement } from 'react';
import { useSelector } from 'store/hooks';
import styles from '../posts/ListStyles.module.css';
import PostPageNavigation from './PostPageNavigation';
import PostPageNewsletterLayout from './PostPageNewsletterLayout';
import PostPageArticleLayout from './PostPageArticleLayout';
import { getPostLaoyut } from 'helpers/getPostLayout';
import PostPageMemberFormLayout from './PostPageMemberFormLayout';
import PostPageDonationFormLayout from './PostPageDonationFormLayout';
import Head from 'next/head';
import Script from 'next/script';

function Post({ post }) {
  const { locale } = useSelector((state) => state.languages);

    /* TO DO'S
     - MAKE A BETTER NO POST FOUND PAGE! maybe even split to a different compoent -> show suggested posts? show helpful links?
    */

  let postDisplay: ReactElement;
  if (post && post !== null) {

    let headDisplay;
    if (post.post_embed_script){
      headDisplay = (
        <Head>
          <Script src={post.post_embed_script} />
        </Head>
      )
    }

    const postLayout = getPostLaoyut(post);
    let postLayoutDisplay: ReactElement;
    if (
      postLayout === 'newsletter'
    ) {
      postLayoutDisplay = (
        <PostPageNewsletterLayout 
          post={post} 
          locale={locale}
        />
      );
    } else if (postLayout === 'member_form'){
      postLayoutDisplay = (
        <PostPageMemberFormLayout 
          post={post} 
          locale={locale}
        />
      )
    } else if (postLayout === 'donation'){
      postLayoutDisplay = (
        <PostPageDonationFormLayout 
          post={post} 
          locale={locale}
        />
      )
    } else {
      postLayoutDisplay = (
        <PostPageArticleLayout 
          post={post} 
          locale={locale}
        />
      );
    }
    postDisplay = (
      <React.Fragment>
        {headDisplay}
        {postLayoutDisplay}
        {post.post_embed_html ? <div className={styles.contentContainer} dangerouslySetInnerHTML={{__html:post.post_embed_html}}></div> : ""}
        <PostPageNavigation postId={post.postId} categoryId={post.categoryId}/>
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