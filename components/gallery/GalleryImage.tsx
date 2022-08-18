import React, { useState, useRef, useEffect } from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import axios from 'axios';
import BlurringImage from '../BlurringImage';
import styles from 'styles/Gallery.module.css';

const GalleryImage = ({ image }) => {
  
  const [ imageData, setImageData ] = useState(null)
  
  console.log(imageData, " IMAGE DATA ")

  useEffect(() => {
    if (imageData === null) fetchPlaceholderImage()
  },[])

  function fetchPlaceholderImage(){
    axios({
      method: 'post',
      url: `/api/galleryimage/placeholder`,
        data:{
          uri:image,
          host:window.location.host,
          port:window.location.port
        }
    }).then((response) => {
      setImageData(response.data)
    }, (error) => {
        console.log(error, "ERROR on add tag to post");
    });
  }
  
  return (
    <div>
      {imageData !== null ? <BlurringImage svg={imageData.svg}/> : ""}
      <img src={generateImageUrl(image)} />
    </div>
  );
};

export default GalleryImage;
