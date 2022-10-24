import React, { ReactElement, useEffect } from "react";
import { useSelector } from "store/hooks";
import styles from "components/posts/ListStyles.module.css";
import PostPageNavigation from "./PostPageNavigation";
import PostPageNewsletterLayout from "./PostPageNewsletterLayout";
import PostPageArticleLayout from "./PostPageArticleLayout";
import { getPostLaoyut } from "helpers/getPostLayout";
import PostPageMemberFormLayout from "./PostPageMemberFormLayout";
import PostPageDonationFormLayout from "./PostPageDonationFormLayout";
import { getPostContentFields } from "helpers/getPostContentFields";
import PostPageLegacyLayout from "./PostPageLegacyLayout";

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

  function isEmpty(val) {
    let isEmpty = false;
    if (!val || val === null || val.length === 0) isEmpty = true;
    return isEmpty;
  }

  let postDisplay: ReactElement;
  if (post && post !== null) {
    const { postExcerpt, postContent, postExcerpt2, postContent2 } =
      getPostContentFields(post, locale);

    const postLayout = getPostLaoyut(post);
    let postLayoutDisplay: ReactElement, postNavigationDisplay: ReactElement;
    if (postLayout === "member_form") {
      postLayoutDisplay = (
        <PostPageMemberFormLayout
          post={post}
          locale={locale}
        />
      );
    } else if (postLayout === "donation") {
      postLayoutDisplay = (
        <PostPageDonationFormLayout
          post={post}
          locale={locale}
        />
      );
    } else if (postLayout === "newsletter") {
      postLayoutDisplay = (
        <PostPageNewsletterLayout
          post={post}
          locale={locale}
        />
      );
      postNavigationDisplay = (
        <PostPageNavigation
          postId={post.postId}
          categoryId={post.categoryId}
        />
      );
    } else if (
      post.post_image == null ||
      isEmpty(postContent) ||
      isEmpty(postExcerpt)
    ) {
      postLayoutDisplay = (
        <PostPageLegacyLayout
          post={post}
          locale={locale}
        />
      );
    } else {
      postLayoutDisplay = (
        <PostPageArticleLayout
          post={post}
          locale={locale}
        />
      );
      postNavigationDisplay = (
        <PostPageNavigation
          postId={post.postId}
          categoryId={post.categoryId}
        />
      );
    }
    postDisplay = (
      <React.Fragment>
        {postLayoutDisplay}
        {postLayout === "donation" || postLayout === "membership" ? (
          <PostPageNavigation
            postId={post.postId}
            categoryId={post.categoryId}
          />
        ) : null}
      </React.Fragment>
    );
  } else {
    postDisplay = (
      <React.Fragment>
        <div className={styles.newsletterLayout}>
          <h1>No Post Found!</h1>
          <article>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </article>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div
      id="post-view"
      className={styles.postPage}
    >
      {postDisplay}
    </div>
  );
}

export default Post;
