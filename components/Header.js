import React from 'react';
import { useSelector } from 'react-redux';
import styles from 'styles/Header.module.css';

const Header = () => {
  const { headerGallery } = useSelector((state) => state.galleries);

  return (
    <div id='main-header' role='main-header' className={styles.header}>
      {/* {headerGallery && headerGallery.imageSrcs
        ? headerGallery.imageSrcs
            .split(',')
            .map((imageSrc, index) => (
              <img
                key={index}
                width='200'
                src={`/wp-content/uploads/${imageSrc}`}
              />
            ))
        : ''} */}
      {/* <img src='background-header.jpg' /> */}
      <div className={styles.container}>
        <p>
          Nicht in unserem Namen!
          <br />
          Jüdische Stimme für gerechten Frieden in Nahost
        </p>
      </div>
    </div>
  );
};

export default Header;
