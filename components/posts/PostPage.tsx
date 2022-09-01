import React, { ReactElement } from 'react';
import { useSelector } from 'store/hooks';
import styles from '../posts/ListStyles.module.css';
import PostPageNavigation from './PostPageNavigation';
import PostPageNewsletterLayout from './PostPageNewsletterLayout';
import PostPageArticleLayout from './PostPageArticleLayout';

function Post({ post }) {
  const { locale } = useSelector((state) => state.languages);

    /* TO DO'S
     - MAKE A BETTER NO POST FOUND PAGE! maybe even split to a different compoent -> show suggested posts? show helpful links?
    */

  let postDisplay: ReactElement;
  if (post && post !== null) {
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
    let postLayoutDisplay: ReactElement;
    if (
      post.categoryName === 'Aktuelles' ||
      post.categoryName === 'Allgemein'
    ) {
      postLayoutDisplay = (
        <PostPageArticleLayout 
          post={post} 
          locale={locale}
          tagsDisplay={tagsDisplay}
        />
      );
    } else {
      postLayoutDisplay = (
        <PostPageNewsletterLayout 
          post={post} 
          locale={locale}
          tagsDisplay={tagsDisplay}
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
