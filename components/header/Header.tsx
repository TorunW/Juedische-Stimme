import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'store/hooks';
import styles from './Styles.module.css';
import BlurringImage from '../blurringImage/BlurringImage';
import { setHeaderImageLoaded } from 'store/aboutinfo/aboutinfoSlice';
import Image from 'next/image';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import HeaderGalleryControllers from './HeaderGalleryControllers';
import { usePrevious } from 'helpers/usePreviousHelper';

const Header = () => {
  const { aboutInfo, headerImage } = useSelector((state) => state.aboutinfo);
  const { headerGallery } = useSelector((state) => state.galleries);
  const dispatch = useDispatch();
  const { img, svg, uri } = headerImage;
  const [slideIndex, setSlideIndex] = useState(0);
  const prevSlideIndex = usePrevious(slideIndex);

  let headerGalleryDisplay: ReactElement[],
    headerGalleryControllersDisplay: ReactElement;
  if (headerGallery !== null) {
    headerGalleryDisplay = headerGallery.imageSrcs
      .split(',')
      .map((imgSrc, index) => {
        // return (
        let blurredBgImage;
        if (index === 0) {
          blurredBgImage = (
            <BlurringImage
              key={imgSrc}
              svg={svg}
              img={img}
              alt={undefined}
              style={undefined}
              height={img.height}
              onLoadingComplete={() => dispatch(setHeaderImageLoaded(true))}
            />
          );
        }

        headerGalleryControllersDisplay = (
          <HeaderGalleryControllers
            slideIndex={slideIndex}
            setSlideIndex={setSlideIndex}
            slideshowLength={headerGallery.imageSrcs.split(',').length - 1}
          />
        );
        return (
          <React.Fragment key={Date.now() + index}>
            <div className={styles.blurredImg}>{blurredBgImage}</div>
            <div className={styles.galleryWrapper}>
              <div
                className={
                  slideIndex === index
                    ? styles.slideActive
                    : prevSlideIndex === index
                    ? styles.prevSlide
                    : styles.slide
                }
              >
                <Image layout='fill' src={generateImageUrl(imgSrc)} />
              </div>
              {headerGalleryControllersDisplay}
            </div>
          </React.Fragment>
        );
      });
  }

  return (
    <header id='main-header' role='main-header' className={styles.header}>
      {headerGalleryDisplay}
      {/* <div
        className={styles.container}
        dangerouslySetInnerHTML={{ __html: headerSlogan }}
      ></div>  */}
    </header>
  );
};

export default Header;
