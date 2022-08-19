import React, { ReactElement } from 'react';
import { useSelector } from 'store/hooks';
import styles from './Styles.module.css';
import BlurringImage from '../blurringImage/BlurringImage';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';

const Header = () => {
  const { aboutInfo, headerImage } = useSelector((state) => state.aboutinfo);

  const { img, svg, uri } = headerImage;

  let blurringImageDisplay;
  if (svg.length > 0 && img && img !== null) {
    console.log(img, ' IMG ');
    blurringImageDisplay = (
      <BlurringImage
        svg={svg}
        img={img}
        alt={undefined}
        style={undefined}
        height={img.height}
      />
    );
  }

  let headerSlogan: any;
  if (aboutInfo && aboutInfo.header_slogan)
    headerSlogan = aboutInfo.header_slogan;
  return (
    <header id='main-header' role='main-header' className={styles.header}>
      <div className={styles.background}> {blurringImageDisplay}</div>
      <div
        className={styles.container}
        dangerouslySetInnerHTML={{ __html: headerSlogan }}
      ></div>
    </header>
  );
};

export default Header;
