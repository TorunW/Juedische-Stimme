import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'store/hooks';
import styles from './Styles.module.css';
import BlurringImage from '../blurringImage/BlurringImage';
import { setHeaderImageLoaded } from 'store/aboutinfo/aboutinfoSlice';
import Image from 'next/image'
import { generateImageUrl } from 'helpers/imageUrlHelper';

const Header = () => {
  const { aboutInfo, headerImage } = useSelector((state) => state.aboutinfo);
  const { headerGallery } = useSelector((state) => state.galleries);
  const dispatch = useDispatch();
  const { img, svg, uri } = headerImage;

  let headerGalleryDisplay: ReactElement[]
  if (headerGallery !== null){
    headerGalleryDisplay = headerGallery.imageSrcs.split(',').map((imgSrc,index)=>{
      if (index == 0){
        return(
          <BlurringImage
            svg={svg}
            img={img}
            alt={undefined}
            style={undefined}
            height={img.height}
            onLoadingComplete={() => dispatch(setHeaderImageLoaded(true))}
          />
        )
      } else {
        return (
          <div>
            <Image layout='fill' src={generateImageUrl(imgSrc)}/>
          </div>
        )
      }
    })
  }

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

  let headerSlogan: any;
  if (aboutInfo && aboutInfo.header_slogan)
    headerSlogan = aboutInfo.header_slogan;
  return (
    <header id='main-header' role='main-header' className={styles.header}>
      <div className={styles.background}>{headerGalleryDisplay}</div>
      <div
        className={styles.container}
        dangerouslySetInnerHTML={{ __html: headerSlogan }}
      ></div>
    </header>
  );
};

export default Header;
