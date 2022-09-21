import React, { useState, useRef } from 'react';
import styles from './Styles.module.css';
import GalleryImage from './GalleryImage';

const Gallery = ({ gallery }) => {
  let slideShow = gallery.imageSrcs
    .split(',')
    .map((imgSrc: string, index: number) => (
      <div
        key={Date.now() + index}
        data-testid={`slide-${index}`}
        className={styles.imageWrapper}
      >
        <GalleryImage image={imgSrc} />
      </div>
    ));

  return (
    <div data-testid='gallery-container' className={styles.gallery}>
      <div className={styles.containerSlider}>{slideShow}</div>
    </div>
  );
};

export default Gallery;
