import React, { useState, useRef } from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import styles from 'styles/Gallery.module.css';
import { usePrevious } from 'helpers/usePreviousHelper';

const Gallery = ({ gallery }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const prevSlideIndex = usePrevious(slideIndex);

  console.log(prevSlideIndex, 'prev');
  console.log(slideIndex, 'current');

  function nextSlide() {
    const nextSlideIndex = slideIndex + 1;
    if (nextSlideIndex < slideShow.length) {
      setSlideIndex(slideIndex + 1);
    } else {
      setSlideIndex(0);
    }
  }

  function prevSlide() {
    const nextSlideIndex = slideIndex + 1;
    if (nextSlideIndex === 0) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 0) {
      setSlideIndex(slideShow.length);
    }
  }

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
        <img src={generateImageUrl(imgSrc)} />
      </div>
    ));

  return (
    <div className={styles.gallery}>
      <div className={styles.containerSlider}>
        <button className={styles.prev} onClick={prevSlide}>
          Prev
        </button>
        {slideShow}
        <button className={styles.next} onClick={nextSlide}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Gallery;
