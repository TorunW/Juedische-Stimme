import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'store/hooks';
import styles from 'components/posts/ListStyles.module.css';
import PostPageNavigation from './PostPageNavigation';
import PostPageNewsletterLayout from './PostPageNewsletterLayout';
import PostPageArticleLayout from './PostPageArticleLayout';
import { getPostLaoyut } from 'helpers/getPostLayout';
import PostPageMemberFormLayout from './PostPageMemberFormLayout';
import PostPageDonationFormLayout from './PostPageDonationFormLayout';
import dynamic from 'next/dynamic';
import { getPostContentFields } from 'helpers/getPostContentFields';

const PostPageEmbededContent = dynamic(
  () => import('./PostPageEmbededContent'),
  {
    suspense: true,
    ssr: false,
  }
);

function Post({ post }) {
  const { locale } = useSelector((state) => state.languages);
  const { postExcerpt, postContent, postExcerpt2 , postContent2 } = getPostContentFields(post, locale)

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

  function isEmpty(val){
    let isEmpty = false;
    if (!val || val === null || val.length === 0 ) isEmpty = true
    return isEmpty
  }

  let postDisplay: ReactElement;
  if (post && post !== null) {
    const postLayout = getPostLaoyut(post);
    let postLayoutDisplay: ReactElement,
        postNavigationDisplay: ReactElement;
    if (postLayout === 'newsletter' || isEmpty(postContent) || isEmpty(postExcerpt2) || isEmpty(postContent2)) {
      postLayoutDisplay = (
        <PostPageNewsletterLayout post={post} locale={locale} />
      );
      postNavigationDisplay = <PostPageNavigation postId={post.postId} categoryId={post.categoryId} />
    } else if (postLayout === 'member_form') {
      postLayoutDisplay = (
        <PostPageMemberFormLayout post={post} locale={locale} />
      );
    } else if (postLayout === 'donation') {
      postLayoutDisplay = (
        <PostPageDonationFormLayout post={post} locale={locale} />
      );
    } else {
      postLayoutDisplay = <PostPageArticleLayout post={post} locale={locale} />;
      postNavigationDisplay = <PostPageNavigation postId={post.postId} categoryId={post.categoryId} />
    }
    postDisplay = (
      <React.Fragment>
        {postLayoutDisplay}
        {post.post_embed_script ? (
          <PostPageEmbededContent
            script={post.post_embed_script}
            html={post.post_embed_html}
          />
        ) : (
          ''
        )}
        {postNavigationDisplay}
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
    <div id='post-view' className={styles.postPage}>
      {postDisplay}
    </div>
  );
}

export default Post;
