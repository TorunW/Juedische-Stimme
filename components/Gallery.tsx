import React from 'react'
import { generateImageUrl } from 'helpers/imageUrlHelper'

const Gallery = ({gallery}) => {
    const images = gallery.imageSrcs.split(',').map((imgSrc:string,index:number) => (
        <img src={generateImageUrl(imgSrc)} />
    ))
    return (
        <div>
            {images}
        </div>
    )
}

export default Gallery