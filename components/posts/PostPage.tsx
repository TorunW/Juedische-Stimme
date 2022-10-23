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

  function isEmpty(val) {
    let isEmpty = false;

    console.log(val.innerText);

    if (!val || val === null || !val.innerText) isEmpty = true;
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
        <PostPageMemberFormLayout post={post} locale={locale} />
      );
    } else if (postLayout === "donation") {
      postLayoutDisplay = (
        <PostPageDonationFormLayout post={post} locale={locale} />
      );
    } else if (
      isEmpty(postContent) ||
      isEmpty(postExcerpt) ||
      isEmpty(postExcerpt2) ||
      isEmpty(postContent2)
    ) {
      postLayoutDisplay = <PostPageLegacyLayout post={post} locale={locale} />;
    } else if (postLayout === "newsletter") {
      postLayoutDisplay = (
        <PostPageNewsletterLayout post={post} locale={locale} />
      );
      postNavigationDisplay = (
        <PostPageNavigation postId={post.postId} categoryId={post.categoryId} />
      );
    } else {
      postLayoutDisplay = <PostPageArticleLayout post={post} locale={locale} />;
      postNavigationDisplay = (
        <PostPageNavigation postId={post.postId} categoryId={post.categoryId} />
      );
    }
    postDisplay = (
      <React.Fragment>
        {postLayoutDisplay}
        {postNavigationDisplay}
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
    <div id="post-view" className={styles.postPage}>
      {postDisplay}
    </div>
  );
}

export default Post;
