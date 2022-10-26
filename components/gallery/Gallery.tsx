import React, { useState, useRef } from 'react';
import styles from './Styles.module.css';
import GalleryImage from './GalleryImage';

const Gallery = ({ images }) => {
  let imageDisplay = images.map((image, index: number) => (
    <div
      key={Date.now() + index}
      data-testid={`slide-${index}`}
      className={styles.container}
    >
      <GalleryImage image={image} />
    </div>
  ));

  return (
    <div data-testid='gallery-container' className={styles.gallery}>
      <h2>Meet our Board Members</h2>
      {imageDisplay}
    </div>
  );
};

export default Gallery;
