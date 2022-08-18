import React, { useState, useRef, useEffect } from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import styles from 'styles/Gallery.module.css';
import axios from 'axios';

const GalleryImage = ({ image }) => {
  console.log(image);
  useEffect(() => {
    axios({
        method: 'post',
        url: `/api/galleryimage/placeholder`,
        data:{
          uri:image
        }
    }).then((response) => {
      console.log(response, " RESPONSE ")
    }, (error) => {
        console.log(error, "ERROR on add tag to post");
    });
  },[])
  return (
    <div>
      <img src={generateImageUrl(image)} />
    </div>
  );
};

export default GalleryImage;
