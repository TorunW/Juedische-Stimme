import React from 'react';
import { useSelector } from 'react-redux';
import styles from 'styles/Header.module.css';

const Header = () => {
  const { aboutInfo } = useSelector(state => state.aboutinfo)
  let headerSlogan;
  if (aboutInfo && aboutInfo.header_slogan) headerSlogan = aboutInfo.header_slogan
  return (
    <div id='main-header' role='main-header' className={styles.header}>
      <div className={styles.container} dangerouslySetInnerHTML={{__html:headerSlogan}}>
      </div>
    </div>
  );
};

export default Header;
