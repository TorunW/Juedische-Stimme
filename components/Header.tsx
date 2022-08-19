import React, { ReactElement } from 'react';
import { useSelector } from 'store/hooks';
import styles from 'styles/Header.module.css';
import BlurringImage from './BlurringImage';

const Header = () => {
  const { aboutInfo, headerImage } = useSelector((state) => state.aboutinfo);

  const { img, svg, uri } = headerImage;


  let blurringImageDisplay;
  if (svg.length > 0 && img ){
    console.log(img, " IMG ")
    blurringImageDisplay = <BlurringImage svg={svg} img={img} />
  }


  let headerSlogan: any;
  if (aboutInfo && aboutInfo.header_slogan)
    headerSlogan = aboutInfo.header_slogan;
  return (
    <header id='main-header' role='main-header' className={styles.header}>
      {blurringImageDisplay}
      <div
        className={styles.container}
        dangerouslySetInnerHTML={{ __html: headerSlogan }}
      ></div>
    </header>
  );
};

export default Header;
