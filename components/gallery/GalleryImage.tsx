import React from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import Image from 'next/image';
import styles from './Styles.module.css';

const GalleryImage = ({ image }) => {
  return (
    <>
      <div className={styles.imageWrapper}>
        <Image
          src={generateImageUrl(image.image_src)}
          alt={image.image_title}
          title={image.image_title}
          objectFit='cover'
          height='150'
          width='150'
        />
      </div>

      <div className={styles.textGrid}>
        <h3>{image.image_title}</h3>
        <div
          dangerouslySetInnerHTML={{ __html: image.image_description }}
        ></div>
      </div>
    </>
  );
};

export default GalleryImage;
