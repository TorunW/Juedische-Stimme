import React, { useState, useRef } from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import styles from 'styles/Gallery.module.css';

const GalleryImage = ({ image }) => {
  console.log(image);
  return (
    <div>
      <img src={generateImageUrl(image)} />
    </div>
  );
};

export default GalleryImage;
