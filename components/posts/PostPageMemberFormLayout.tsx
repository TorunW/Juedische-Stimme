import React from 'react'

const PostPageMemberFormLayout = ({post,locale}) => {

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

    return (
        <React.Fragment>
          <h1>MEMBER FORM LAYOUT!</h1>
          <div dangerouslySetInnerHTML={{__html:postContent}}></div>
        </React.Fragment>
    )
}

export default PostPageMemberFormLayout