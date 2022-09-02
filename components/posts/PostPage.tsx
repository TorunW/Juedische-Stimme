import React, { ReactElement, useEffect } from 'react';
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

  // useEffect(() => {
  //   if (post && post.post_embed_script !== null){
  //     var s = document.createElement('script');
  //     s.setAttribute('src', post.post_embed_script);
  //     (document.body || document.head).appendChild(s);
  //   }
  // }, []);

    /* TO DO'S
     - MAKE A BETTER NO POST FOUND PAGE! maybe even split to a different compoent -> show suggested posts? show helpful links?
    */

  let postDisplay: ReactElement;
  if (post && post !== null) {
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
        {postLayoutDisplay}
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