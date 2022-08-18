import React from 'react'
import Image from 'next/image';
import axios from 'axios'
import { GeneratePostUrl } from 'helpers/generatePostUrl';
import { generateImageUrl } from 'helpers/imageUrlHelper';

function Posts({posts}) {

    function deletePost(post){
        
        let deleteRequests = [];
        if (post.tagIds !== null){
          let tagIds = post.tagIds.split(',')
          tagIds.forEach(function(tagId,index){
            const deleteTagPostRelationshipUrl = `/api/tags/${post.postId}/${tagId}`;
            const deleteTagPostRelationshipRequest = axios.delete(deleteTagPostRelationshipUrl)
            deleteRequests.push(deleteTagPostRelationshipRequest);
          })
        }

        const deletePostUrl = `/api/posts/${post.postId}`
        const deletePostRequest = axios.delete(deletePostUrl,{data:{categoryId:post.categoryId}})
        deleteRequests.push(deletePostRequest);
        
        axios.all([...deleteRequests]).then(axios.spread((...responses) => {
            // console.log(responses)
            window.location.reload()
        })).catch(errors => {
            console.log(errors, " ERRORS")
            // react on errors.
        })
    }

    let postsDisplay;
    if (posts){
        postsDisplay = posts.map((post,index)=>(
            <div key={index}>
                <Image height="100" width="100" src={generateImageUrl(post.post_image)}/>
                <h3><a href={"/admin/posts/" + GeneratePostUrl(post.post_name)}>{post.post_title}</a></h3>
                <span>AUTHOR: {post.username}</span>
                <span>DATE PUBLISHED:{new Date(post.post_date).toLocaleString('de')}</span>
                <button onClick={() => deletePost(post)}>
                    DELETE POST
                </button>
            </div>
        ))
    }

    return (
        <div>
            {postsDisplay}
        </div>
    )
}

export default Posts