import React from 'react'

function Post({ post }) {

    console.log(post)

    /* TO DO'S
     - DISPLAY TAGS IN A BETTER WAY
     - MAKE A BETTER NO POST FOUND PAGE! maybe even split to a different compoent -> show suggested posts? show helpful links?
     - show the NEXT POST / PREVIOUS POST buttons, get the next post name, previous post name in the query!
    */
   
    let postDisplay;
    if (post && post !== null){
        let tagsDisplay;
        if (post.tagNames && post.tagNames.length > 0 ){
            let tagsArray = [post.tagNames];
            if (post.tagNames.indexOf(',') > -1) tagsArray = post.tagNames.split(',')
            tagsDisplay = tagsArray.map((tag,index) => (<a key={index} href={"/tag/"+tag}>{' <' + tag + '> '}</a>))
        }
        postDisplay = (
            <React.Fragment>
                <h1>{post.post_title}</h1>
                <h4><a href={`/category/${post.categoryName}`}>{post.categoryName}</a></h4>                
                <p>{tagsDisplay}</p>
                <div dangerouslySetInnerHTML={{__html:post.post_content.replace(/(?:\r\n|\r|\n)/g, '<br>')}}></div>
            </React.Fragment>
        )
    } else {
        postDisplay = (
            <React.Fragment>
                <h1>No Post Found!</h1>
            </React.Fragment>
        )
    }
    return (
        <div>
            {postDisplay}
        </div>
    )
}

export default Post