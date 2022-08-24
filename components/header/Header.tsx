import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'store/hooks';
import styles from './Styles.module.css';
import BlurringImage from '../blurringImage/BlurringImage';
import { setHeaderImageLoaded } from 'store/aboutinfo/aboutinfoSlice';

const Header = () => {
  const { aboutInfo, headerImage } = useSelector((state) => state.aboutinfo);
  const dispatch = useDispatch();

  const { img, svg, uri } = headerImage;

  let blurringImageDisplay: ReactElement;
  if (svg.length > 0 && img && img !== null) {
    // console.log(img, ' IMG ');
    blurringImageDisplay = (
      <BlurringImage
        svg={svg}
        img={img}
        alt={undefined}
        style={undefined}
        height={img.height}
        onLoadingComplete={() => dispatch(setHeaderImageLoaded(true))}
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
