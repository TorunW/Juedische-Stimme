import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const { headerGallery } = useSelector((state) => state.galleries);

  return (
    <div id='main-header' role='main-header'>
      {headerGallery && headerGallery.imageSrcs
        ? headerGallery.imageSrcs
            .split(',')
            .map((imageSrc, index) => (
              <img
                key={index}
                width='200'
                src={`/wp-content/uploads/${imageSrc}`}
              />
            ))
        : ''}
      <hr />
      <article>
        <h1>THE HEADER TEXT TITLE</h1>
        <p>header text description </p>
      </article>
    </div>
  );
};

export default Header;
