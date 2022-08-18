import React, { useState, useRef, useEffect } from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import styles from 'styles/Gallery.module.css';
import axios from 'axios';
import BlurringImage from '../BlurringImage';

const GalleryImage = ({ image }) => {
  
  const [ imageData, setImageData ] = useState(null)
  
  console.log(imageData, " IMAGE DATA ")

  useEffect(() => {
    if (imageData !== null) fetchPlaceholderImage()
  },[])

  function fetchPlaceholderImage(){
    console.log('FETCH PLACEHOLDER IMAGE ')
    axios({
      method: 'post',
      url: `/api/galleryimage/placeholder`,
        data:{
          uri:image
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
