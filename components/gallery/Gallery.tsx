import React, { useState, useRef } from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import styles from './Styles.module.css';
import { usePrevious } from 'helpers/usePreviousHelper';
import GalleryImage from './GalleryImage';
import GalleryControllers from './GalleryControllers';

const Gallery = ({ gallery }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const prevSlideIndex = usePrevious(slideIndex);

  let slideShow = gallery.imageSrcs
    .split(',')
    .map((imgSrc: string, index: number) => (
      <div
        key={Date.now() + index}
        className={
          slideIndex === index
            ? styles.slideActive
            : prevSlideIndex === index
            ? styles.prevSlide
            : styles.slide
        }
      >
        <GalleryImage image={imgSrc} />
      </div>
    ));

  return (
    <div className={styles.gallery}>
      <div className={styles.containerSlider}>
        <GalleryControllers
          slideIndex={slideIndex}
          setSlideIndex={setSlideIndex}
          slideshowLength={slideShow.length}
        />
        {slideShow}
      </div>
    </div>
  );
};

export default Gallery;
