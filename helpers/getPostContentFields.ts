export const getPostContentFields = (post, locale) => {
  console.log(post);
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
      : post.post_excerpt_2;
    postContent = post[`post_content_translation_${locale}`]
      ? post[`post_content_translation_${locale}`]
      : post.post_content;
    postContent2 = post[`post_content_2_translation_${locale}`]
      ? post[`post_content_2_translation_${locale}`]
      : post.post_content_2;
  }

  return { postTitle, postExcerpt, postExcerpt2, postContent, postContent2 };
};
