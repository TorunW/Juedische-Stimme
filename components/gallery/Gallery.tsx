import React, { useState, useRef } from 'react';
import styles from './Styles.module.css';
import GalleryImage from './GalleryImage';

const Gallery = ({ images }) => {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    isActive === false ? setIsActive(true) : setIsActive(false);
  }
  let imageDisplay = images.map((image, index: number) => (
    <div
      key={Date.now() + index}
      data-testid={`slide-${index}`}
      className={styles.card}
    >
      <GalleryImage image={image} isActive={isActive} />
      <a
        onClick={handleClick}
        className={
          isActive === false ? styles.more : styles.more + ' ' + styles.active
        }
      >
        {isActive === false ? 'Read more...' : 'Read Less...'}
      </a>
    </div>
  ));

  return (
    <div data-testid='gallery-container' className={styles.gallery}>
      {/* <h2>Meet our Board Members</h2> */}
      <div className={styles.container}>{imageDisplay}</div>
    </div>
  );
};

export default Gallery;
