import React from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import BlurringImage from '../blurringImage/BlurringImage';
import Image from 'next/image';

const GalleryImage = ({ image }) => {
  return (
    <div>
      <Image
        src={generateImageUrl(image)}
        alt='gallery image'
        title='gallery image'
        width='340'
        height='340'
        objectFit='cover'
      />
    </div>
  );
};

export default GalleryImage;
