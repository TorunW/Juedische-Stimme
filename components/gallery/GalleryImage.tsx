import React from "react";
import { generateImageUrl } from "helpers/imageUrlHelper";
import Image from "next/image";
import styles from "./Styles.module.css";
import { useSelector } from "store/hooks";
import { getLabel } from "helpers/getLabelHelper";
import { generateFileServerSrc } from "helpers/generateFileServerSrc";

const GalleryImage = ({ image }) => {
  const { locale } = useSelector((state) => state.languages);
  const { labels } = useSelector((state) => state.labels);
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    open === false ? setOpen(true) : setOpen(false);
  }

  return (
    <>
      <div className={styles.imageWrapper}>
        <Image
          src={generateFileServerSrc(image.image_src)}
          alt={image.image_title}
          title={image.image_title}
          objectFit="cover"
          height="160"
          width="150"
        />
        <h3>{image.image_title}</h3>
      </div>

      <div className={open === false ? styles.content : styles.contentOpen}>
        <div
          dangerouslySetInnerHTML={{ __html: image.image_description }}
        ></div>
      </div>
      <a
        onClick={handleClick}
        className={
          open === false ? styles.more : styles.more + " " + styles.active
        }
      >
        {open === false
          ? getLabel(labels, locale, "read_more", "weiter lesen")
          : getLabel(labels, locale, "read_less", "weniger lesen")}
      </a>
    </>
  );
};

export default GalleryImage;
