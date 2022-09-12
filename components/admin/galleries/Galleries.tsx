import React from 'react'
import axios from 'axios';
import Link from 'next/link';
import { Gallery } from 'types/Gallery.type';

const Galleries = (props) => {

    function deleteGallery(gallery: Gallery){
        console.log(gallery, " GALLERY ON DELETE")
        let deleteRequests = [];
        if (gallery.imageIds !== null){
          let imageSrcs = gallery.imageSrcs.split(',')
          let imageIds = gallery.imageIds.split(',')
          imageSrcs.forEach(function(imageSrc:string,index:number){
            const deleteFileUrl = `http://${window.location.hostname}${window.location.port !== "80" ? ':'+window.location.port : ""}/media/${imageSrc.split('/').join('+++')}`;
            const deleteFileRequest = axios.delete(deleteFileUrl)
            deleteRequests.push(deleteFileRequest)
            const deleteGalleryImageUrl = `/api/galleryimage/${imageIds[index]}`
            const deleteGalleryImageRequest = axios.delete(deleteGalleryImageUrl)
            deleteRequests.push(deleteGalleryImageRequest)
          })
        }
        const deleteGalleryUrl = `/api/galleries/${gallery.gallery_id}`
        const deleteGalleryRequest = axios.delete(deleteGalleryUrl)
        deleteRequests.push(deleteGalleryRequest);
  
        axios.all([...deleteRequests]).then(axios.spread((...responses) => {
            console.log(responses)
            window.location.reload()
            // use/access the results 
        })).catch(errors => {
            console.log(errors, " ERRORS")
            // react on errors.
        })
  
      }
  
      let galleriesDisplay;
      if (props.galleries){
        /* 
          TO DO
          none of the pages should have data - render logic. 
          mapping of galleries should be handled by a dedicated Galleries or AdminGalleries component 
        */
          galleriesDisplay = props.galleries.map((gallery,index) => (
              <li key={index}>
                <Link href={`/admin/galleries/${gallery.gallery_id}`}>{gallery.gallery_name}</Link>
                <br/>
                {gallery.gallery_id === 6 || gallery.gallery_id === 5 ? "" : <button onClick={() => deleteGallery(gallery)}>DELETE GALLERY</button> }
              </li>
          ))
      } else galleriesDisplay = <h3>NO GALLERIES FOUND</h3>
  

    return (
        <div>{galleriesDisplay}</div>
    )
}

export default Galleries