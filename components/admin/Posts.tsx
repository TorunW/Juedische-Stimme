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

        if (post.post_image !== null && post.post_image.indexOf('null') === -1){
            const deleteFileUrl = `http://${window.location.hostname}${window.location.port !== '80' ? ':'+window.location.port : ""}/media/${post.post_image.split('/').join('+++')}`;
            const deleteFileRequest = axios.delete(deleteFileUrl)
            deleteRequests.push(deleteFileRequest)
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