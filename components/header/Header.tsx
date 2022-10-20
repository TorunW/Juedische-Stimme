import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "store/hooks";
import styles from "./Styles.module.css";
import BlurringImage from "../blurringImage/BlurringImage";
import { setHeaderImageLoaded } from "store/aboutinfo/aboutinfoSlice";
import Image from "next/image";
import { generateImageUrl } from "helpers/imageUrlHelper";
import HeaderGalleryControllers from "./HeaderGalleryControllers";
import { usePrevious } from "helpers/usePreviousHelper";

const Header = () => {
  const { aboutInfo, headerImage } = useSelector((state) => state.aboutinfo);
  const { headerGallery } = useSelector((state) => state.galleries);
  const dispatch = useDispatch();
  const { img, svg, uri } = headerImage;
  const [slideIndex, setSlideIndex] = useState(0);
  const prevSlideIndex = usePrevious(slideIndex);

  // const headerGallery = {
  //   gallery_id: 6,
  //   gallery_name: "Header Gallery",
  //   gallery_description: "gallery of the header",
  //   gallery_type: "slide",
  //   imageSrcs: "2022/09/ZYX1164_korr.jpg.jpeg",
  // };

  const imageSrcs =
    headerGallery?.imageSrcs.indexOf(",") > -1
      ? headerGallery.imageSrcs.split(",")
      : [headerGallery?.imageSrcs];

  return (
    <header
      id="main-header"
      role="main-header"
      className={styles.header}
    >
      {headerGallery !== null && img !== null ? (
        <>
          <div className={styles.sliderWrapper}>
            {imageSrcs.map((imgSrc, index) => {
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
                    onLoadingComplete={() =>
                      dispatch(setHeaderImageLoaded(true))
                    }
                  />
                );
              }

              return (
                <React.Fragment key={Date.now() + index}>
                  <div className={styles.blurredImageContainer}>
                    {blurredBgImage}
                  </div>

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
              dangerouslySetInnerHTML={{ __html: aboutInfo?.header_slogan }}
            ></div>
          )}
        </>
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
