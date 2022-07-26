import React from 'react';
import { useSelector } from 'react-redux';
import styles from 'styles/Header.module.css';

const Header = () => {
  return (
    <div id='main-header' role='main-header' className={styles.header}>
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
