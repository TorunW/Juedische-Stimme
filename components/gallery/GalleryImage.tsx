import React, { useState, useRef, useEffect } from 'react';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import axios from 'axios';
import BlurringImage from '../BlurringImage';
import styles from 'styles/Gallery.module.css';

const GalleryImage = ({ image }) => {
  return (
    <div><img src={generateImageUrl(image)} /></div>
  );
};

export default GalleryImage;
