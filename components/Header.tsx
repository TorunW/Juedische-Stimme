import React, { ReactElement } from 'react';
import { useSelector } from 'store/hooks';
import styles from 'styles/Header.module.css';

const Header = () => {
  const { aboutInfo, headerImage } = useSelector((state) => state.aboutinfo);
  const { img, svg, uri } = headerImage

  console.log(img, " IMG ")
  console.log(svg, " SVG ")
  console.log(uri, " URI ")

  let headerSlogan: any;
  if (aboutInfo && aboutInfo.header_slogan)
    headerSlogan = aboutInfo.header_slogan;
  return (
    <header id='main-header' role='main-header' className={styles.header}>
      <div
        className={styles.container}
        dangerouslySetInnerHTML={{ __html: headerSlogan }}
      ></div>
    </header>
  );
};

export default Header;
