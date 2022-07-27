import React, { useState } from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import styles from 'styles/Gallery.module.css';

const Gallery = ({ gallery }) => {
  const [slideIndex, setSlideIndex] = useState(1);

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
        className={slideIndex === index + 1 ? styles.slideActive : styles.slide}
      >
        <img src={generateImageUrl(imgSrc)} />
      </div>
    ));

  console.log(slideShow.length);

  // = gallery.imageSrcs
  // .split(',')
  // .map((imgSrc: string, index: number) => (
  //   <div className={styles.item}>
  //     <img key={Date.now() + index} src={generateImageUrl(imgSrc)} />
  //   </div>
  // ));

  return (
    <div>
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
