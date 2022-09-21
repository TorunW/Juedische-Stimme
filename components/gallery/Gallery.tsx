import React, { useState, useRef } from 'react';
import styles from './Styles.module.css';
import GalleryImage from './GalleryImage';

const Gallery = ({ images }) => {

  console.log(images, " IMAGES ")

  let slideShow = images.map((image, index: number) => (
      <div
        key={Date.now() + index}
        data-testid={`slide-${index}`}
        className={styles.imageWrapper}
      >
        <GalleryImage 
          image={image} 
        />
      </div>
    ));

  return (
    <div data-testid='gallery-container' className={styles.gallery}>
      <div className={styles.containerSlider}>{slideShow}</div>
    </div>
  );
};

export default Gallery;
