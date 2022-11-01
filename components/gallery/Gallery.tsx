import React from "react";
import styles from "./Styles.module.css";
import GalleryImage from "./GalleryImage";
import { useSelector } from "store/hooks";
import { getLabel } from "helpers/getLabelHelper";

const Gallery = ({ images }) => {
  const { locale } = useSelector((state) => state.languages);
  const { labels } = useSelector((state) => state.labels);

  let imageDisplay = images.map((image, index: number) => (
    <div
      key={Date.now() + index}
      data-testid={`slide-${index}`}
      className={styles.card}
    >
      <GalleryImage image={image} />
    </div>
  ));

  return (
    <div
      data-testid="gallery-container"
      className={styles.gallery}
    >
      <h2>{getLabel(labels, locale, "board_members_title", "Vorstand")}</h2>
      <div className={styles.container}>{imageDisplay}</div>
    </div>
  );
};

export default Gallery;
