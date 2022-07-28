import React, { useState, useRef } from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import styles from 'styles/Gallery.module.css';
import { usePrevious } from 'helpers/usePreviousHelper';

const Gallery = ({ gallery }) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const prevSlideIndex = usePrevious(slideIndex);

  console.log(prevSlideIndex, 'prev');
  console.log(slideIndex, 'current');

  function nextSlide() {
    if (slideIndex !== slideShow.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === slideShow.length) {
      setSlideIndex(1);
    }
  }

  function prevSlide() {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(slideShow.length);
    }
  }

  let slideShow = gallery.imageSrcs
    .split(',')
    .map((imgSrc: string, index: number) => (
      <div
        key={Date.now() + index}
        className={
          slideIndex === index + 1
            ? styles.slideActive
            : prevSlideIndex === index + 1
            ? styles.prevSlide
            : styles.slide
        }
      >
        <img className={styles.img} src={generateImageUrl(imgSrc)} />
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
