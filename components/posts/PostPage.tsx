import React, { ReactElement } from "react";
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
import PostPageInfoLayout from "./PostPageInfoLayout";

function Post({ post }) {
  const { locale } = useSelector((state) => state.languages);

  function isEmpty(val) {
    let isEmpty = false;
    if (!val || val === null || val.length === 0) isEmpty = true;
    return isEmpty;
  }

  let postDisplay: ReactElement;
  if (post && post !== null) {
    const { postExcerpt, postContent } = getPostContentFields(post, locale);

    const postLayout = getPostLaoyut(post);

    let postLayoutDisplay: ReactElement;
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
    } else if (postLayout === "info") {
      postLayoutDisplay = (
        <PostPageInfoLayout
          post={post}
          locale={locale}
        />
      );
    } else if (isEmpty(postContent) || isEmpty(postExcerpt)) {
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
    }

    postDisplay = (
      <React.Fragment>
        {postLayoutDisplay}
        {postLayout !== "donation" && postLayout !== "member_form" ? (
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
          <article></article>
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
