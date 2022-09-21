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

  let headerGalleryDisplay: ReactElement[];
  if (headerGallery !== null) {
    headerGalleryDisplay = headerGallery.imageSrcs
      .split(',')
      .map((imgSrc, index) => {
        return (
          <div
            key={Date.now() + index}
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
        );
        // if (index == 0) {
        //   return (
        //     <BlurringImage
        //       key={imgSrc}
        //       svg={svg}
        //       img={img}
        //       alt={undefined}
        //       style={undefined}
        //       height={img.height}
        //       onLoadingComplete={() => dispatch(setHeaderImageLoaded(true))}
        //     />
        //   );
        // } else {
        //   return (
        //     <div key={imgSrc}>
        //       <Image
        //         layout='fill'
        //         src={generateImageUrl(imgSrc)}
        //         className={
        //           slideIndex === index
        //             ? styles.slideActive
        //             : prevSlideIndex === index
        //             ? styles.prevSlide
        //             : styles.slide
        //         }
        //       />
        //     </div>
        // );
        // }
      });
  }

  // console.log(headerGalleryDisplay.length);

  let headerSlogan: any;
  if (aboutInfo && aboutInfo.header_slogan)
    headerSlogan = aboutInfo.header_slogan;
  return (
    <header id='main-header' role='main-header' className={styles.header}>
      <div className={styles.containerSlider}>
        {headerGalleryDisplay}
        <HeaderGalleryControllers
          slideIndex={slideIndex}
          setSlideIndex={setSlideIndex}
          slideshowLength={headerGalleryDisplay}
        />
      </div>
      {/* <div
        className={styles.container}
        dangerouslySetInnerHTML={{ __html: headerSlogan }}
      ></div>  */}
    </header>
  );
};

export default Header;

// let blurringImageDisplay: ReactElement;
// if (svg.length > 0 && img && img !== null) {
//   blurringImageDisplay = (
//     <BlurringImage
//       svg={svg}
//       img={img}
//       alt={undefined}
//       style={undefined}
//       height={img.height}
//       onLoadingComplete={() => dispatch(setHeaderImageLoaded(true))}
//     />
//   );
// }
