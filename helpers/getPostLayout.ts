export function getPostLaoyut(post){
    let layout = 'article';
    if (post.post_layout) layout = post.post_layout;
    if (post.categoryName === 'Newsletter') layout = 'newsletter'
    return layout;
}