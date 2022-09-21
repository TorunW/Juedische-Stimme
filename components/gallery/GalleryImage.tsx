import React from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import BlurringImage from '../blurringImage/BlurringImage';
import Image from 'next/image';

const GalleryImage = ({ image }) => {
  return (
    <div>
      <Image
        src={generateImageUrl(image.image_src)}
        alt={image.image_title}
        title={image.image_title}
        width='340'
        height='340'
        objectFit='cover'
      />
      <article>
        <h3>{image.image_title}</h3>
        <div dangerouslySetInnerHTML={{__html:image.image_description}}></div>
      </article>
    </div>
  );
};

export default GalleryImage;
