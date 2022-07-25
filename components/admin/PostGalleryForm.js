import React, { useEffect, useState } from 'react'
import GalleryForm from './GalleryForm'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const PostGalleryForm = ({postId,postName, galleryId}) => {
    
    const { galleries } = useSelector(state => state.galleries)

    const [ selectedGalleryId, setSelectedGalleryId ] = useState(galleryId)
    const [ gallery, setGallery ] = useState()

    useEffect(() => {
        if (selectedGalleryId){
            setGallery()
            if (selectedGalleryId !== null && selectedGalleryId !== "Select Gallery"){
                getGallery(selectedGalleryId)
            }
        }
    },[selectedGalleryId])

    useEffect(() => {
        if (gallery){
            console.log(gallery, " GALLERY ")
            // saveGalleryToPost()
        }
    },[gallery])

    async function getGallery(galleryId){
        const res = await fetch(`/api/galleries/${galleryId}`)
        const data = await res.json()
        setGallery(data.gallery)
    }

    function saveGalleryToPost(){

        const axiosUrl =  `/api/posts/${postId}/gallery/`
        console.log(axiosUrl)
        axios({
            method: galleryId ? 'put' : 'post',
            url: axiosUrl,
            data: { galleryId:selectedGalleryId }
        }).then((response) => {
            console.log(response,"response on gallery (put or post)");
            if (response.data){
                // window.location.href = `/admin/posts/${postName}` // BETTER FETCH THE POSTS THEN REFRESH PAGE
            }
        }, (error) => {
            console.log(error, "ERROR on post");
            console.log('NOW NEEDS TO DISPLAY ERRORS!')
        });
    }

    let galleryFormDisplay;
    if (gallery && selectedGalleryId !== null){
        galleryFormDisplay = (
            <GalleryForm 
                gallery={gallery}
            />
        )
    }

    return (
        <div>
            <select value={selectedGalleryId} onChange={e => setSelectedGalleryId(e.target.value)}>
                <option value={null}>Select Gallery</option>
                {galleries.map((gallery,index) => (
                    <option key={Date.now() + index} value={gallery.gallery_id}>{gallery.gallery_name}</option>
                ))}
            </select>
            <button onClick={saveGalleryToPost}>SAVE GALLERY TO POST</button>
            {galleryFormDisplay}
        </div>
    )
}

export default PostGalleryForm