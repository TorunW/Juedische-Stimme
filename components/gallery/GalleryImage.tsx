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
        layout='fill'
        objectFit='cover'
      />
    </div>
  );
};

export default GalleryImage;
