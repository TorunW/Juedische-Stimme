import React from 'react'
import axios from 'axios'
import Image from 'next/image'

const MediaItems = ({mediaItems}) => {

    function deleteMediaItem(mediaItem){

        const deleteFileUrl = `http://${window.location.hostname}${window.location.port !== 80 ? ':'+window.location.port : ""}/media/${mediaItem.meta_value.split('/').join('+++')}`;
        const deleteFileRequest = axios.delete(deleteFileUrl)
        const deleteMediaItemUrl = `/api/media/${mediaItem.meta_id}`
        const deleteMediaItemRequest = axios.delete(deleteMediaItemUrl)

        axios.all([deleteFileRequest, deleteMediaItemRequest]).then(axios.spread((...responses) => {
            const deleteFileResponse = responses[0]
            const deleteMediaItemResponse = responses[1]
            // console.log(deleteFileResponse)
            // console.log(deleteMediaItemResponse)
            window.location.reload()
            // use/access the results 
        })).catch(errors => {
            console.log(errors, " ERRORS")
            // react on errors.
        })
    }

    let mediaItemsDisplay;
    if (mediaItems){
        mediaItemsDisplay = mediaItems.map((mediaItem,index) => (
            // TO DO - NEED TO HAVE A DIFFERENT DISPLAY FOR VIDEOS!!!!!!!!!!!(!!!)
            <li key={index}>
                <Image width={'100px'} height={'100px'} src={`/wp-content/uploads/${mediaItem.meta_value}`}/>
                <br/>
                <span>
                    POST: {mediaItem.post_name ? <a href={`/admin/posts/${mediaItem.post_name}`}>{mediaItem.post_title}</a> : " DELETED!"}
                </span>
                <br/>
                <button onClick={() => deleteMediaItem(mediaItem)}>
                    DELETE MEDIA ITEM
                </button>
            </li>
        ))
    }

    return (
        <div>
            {mediaItemsDisplay}
        </div>
    )
}

export default MediaItems