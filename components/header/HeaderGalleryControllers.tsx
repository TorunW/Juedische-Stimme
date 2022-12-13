import React, { useState, useEffect } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from '@mui/material';
import styles from './Styles.module.css';

const HeaderGalleryControllers = ({
  slideIndex,
  setSlideIndex,
  slideshowLength,
}) => {
  const [buttonHidden, setButtonHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      document.getElementById('next-button').click();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (buttonHidden === true) {
      setTimeout(() => {
        setButtonHidden(false);
      }, 500);
    }
  }, [buttonHidden]);

  function nextSlide() {
    if (buttonHidden === false) {
      const nextSlideIndex = slideIndex + 1;
      if (nextSlideIndex <= slideshowLength) {
        setSlideIndex(slideIndex + 1);
      } else {
        setSlideIndex(0);
      }
      setButtonHidden(true);
    }
  }

  function prevSlide() {
    if (buttonHidden === false) {
      const nextSlideIndex = slideIndex - 1;
      if (nextSlideIndex < 0) {
        setSlideIndex(slideshowLength - 1);
      } else {
        setSlideIndex(nextSlideIndex);
      }
      setButtonHidden(true);
    }
  }

  return (
    <div className={styles.galleryControllers}>
      <button
        className={styles.prev}
        onClick={prevSlide}
        data-testid='previous-button'
      >
        <IconButton>
          <ArrowBackIosNewIcon sx={{ color: 'white' }} fontSize='large' />
        </IconButton>
      </button>
      <button
        className={styles.next}
        onClick={nextSlide}
        data-testid='next-button'
        id='next-button'
      >
        <IconButton>
          <ArrowForwardIosIcon sx={{ color: 'white' }} fontSize='large' />
        </IconButton>
      </button>
    </div>
  );
};

export default HeaderGalleryControllers;
