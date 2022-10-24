import React, { useState } from "react";
import { useDispatch, useSelector } from "store/hooks";
import styles from "./Styles.module.css";
import BlurringImage from "../blurringImage/BlurringImage";
import { setHeaderImageLoaded } from "store/aboutinfo/aboutinfoSlice";
import Image from "next/image";
import { generateImageUrl } from "helpers/imageUrlHelper";
import HeaderGalleryControllers from "./HeaderGalleryControllers";
import { usePrevious } from "helpers/usePreviousHelper";
import { Skeleton } from "@mui/material";

const Header = () => {
  const { aboutInfo, headerImage } = useSelector((state) => state.aboutinfo);
  const { headerGallery } = useSelector((state) => state.galleries);
  const dispatch = useDispatch();
  const { img, svg, uri } = headerImage;
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
                    <Skeleton
                      sx={{
                        width: "100vw",
                        height: "1080px",
                        marginTop: "-240px",
                      }}
                    />
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
