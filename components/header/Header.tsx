import React, { useState } from "react";
import { useSelector } from "store/hooks";
import styles from "./Styles.module.css";
import Image from "next/image";
import { generateImageUrl } from "helpers/imageUrlHelper";
import HeaderGalleryControllers from "./HeaderGalleryControllers";
import { usePrevious } from "helpers/usePreviousHelper";

const Header = () => {
  const { aboutInfo, headerImage } = useSelector((state) => state.aboutinfo);
  const { locale, defaultLocale } = useSelector((state) => state.languages);

  const headerSlogan =
    locale !== defaultLocale
      ? aboutInfo?.header_slogan_en_US
      : aboutInfo?.header_slogan;

  const { headerGallery } = useSelector((state) => state.galleries);
  const { img } = headerImage;
  const [slideIndex, setSlideIndex] = useState(0);
  const prevSlideIndex = usePrevious(slideIndex);

  const imageSrcs =
    headerGallery?.imageSrcs.indexOf(",") > -1
      ? headerGallery.imageSrcs.split(",")
      : [headerGallery?.imageSrcs];
  const [isSlideShow, setIsSlideShow] = useState(
    imageSrcs.length > 1 ? true : false
  );

  return (
    <header
      id="main-header"
      role="main-header"
      className={
        isSlideShow === true ? styles.headerSlideShow : styles.headerStill
      }
    >
      {headerGallery !== null && img !== null && (
        <>
          <div className={styles.sliderWrapper}>
            {imageSrcs.map((imgSrc, index) => {
              return (
                <React.Fragment key={Date.now() + index}>
                  <div
                    className={
                      slideIndex === index
                        ? styles.slideActive
                        : prevSlideIndex === index
                        ? styles.prevSlide
                        : styles.slide
                    }
                  >
                    <Image
                      layout="fill"
                      src={generateImageUrl(imgSrc)}
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          {imageSrcs.length > 1 ? (
            <div className={styles.controllersWrapper}>
              <HeaderGalleryControllers
                slideIndex={slideIndex}
                setSlideIndex={setSlideIndex}
                slideshowLength={headerGallery.imageSrcs.split(",").length - 1}
              />
            </div>
          ) : (
            <div
              className={styles.container}
              dangerouslySetInnerHTML={{ __html: headerSlogan }}
            ></div>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
