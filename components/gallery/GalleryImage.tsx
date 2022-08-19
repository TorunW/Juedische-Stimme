import React from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import BlurringImage from '../blurringImage/BlurringImage';

const GalleryImage = ({ image }) => {
  return (
    <div>
      <img src={generateImageUrl(image)} />
    </div>
  );
};

export default GalleryImage;
