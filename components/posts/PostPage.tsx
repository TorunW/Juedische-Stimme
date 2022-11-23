import styles from "components/posts/ListStyles.module.css";
import { getPostLaoyut } from "helpers/getPostLayout";
import { useSelector } from "store/hooks";
import PostPageArticleLayout from "./PostPageArticleLayout";
import PostPageDonationFormLayout from "./PostPageDonationFormLayout";
import PostPageInfoLayout from "./PostPageInfoLayout";
import PostPageLegacyLayout from "./PostPageLegacyLayout";
import PostPageMemberFormLayout from "./PostPageMemberFormLayout";
import PostPageNavigation from "./PostPageNavigation";
import PostPageNewsletterLayout from "./PostPageNewsletterLayout";

import $switch from "dolla-switch";

function Post({ post }) {
  const { locale } = useSelector((state) => state.languages);
  const postLayout = post ? getPostLaoyut(post) : null;

  return (
    <div
      id="post-view"
      className={styles.postPage}
    >
      {!post ? (
        <div className={styles.newsletterLayout}>
          <h1>No Post Found!</h1>
          <article></article>
        </div>
      ) : (
        <>
          {$switch(
            postLayout,
            {
              member_form: () => (
                <PostPageMemberFormLayout
                  post={post}
                  locale={locale}
                />
              ),
              donation: () => (
                <PostPageDonationFormLayout
                  post={post}
                  locale={locale}
                />
              ),
              newsletter: () => (
                <PostPageNewsletterLayout
                  post={post}
                  locale={locale}
                />
              ),
              info: () => (
                <PostPageInfoLayout
                  post={post}
                  locale={locale}
                />
              ),
              article: () => (
                <PostPageArticleLayout
                  post={post}
                  locale={locale}
                />
              ),
            },
            () => (
              <PostPageLegacyLayout
                post={post}
                locale={locale}
              />
            )
          )}
          {postLayout !== "donation" && postLayout !== "member_form" && (
            <PostPageNavigation
              postId={post.postId}
              categoryId={post.categoryId}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Post;
