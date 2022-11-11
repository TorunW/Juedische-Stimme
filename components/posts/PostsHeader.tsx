import Image from "next/image";
import React from "react";
import styles from "./Styles.module.css";
import postHeader from "public/post-header.jpg";
import { useSelector } from "store/hooks";
import { generateImageUrl } from "helpers/imageUrlHelper";

const PostsHeader = () => {
  const { category } = useSelector((state) => state.categories);
  const { tag } = useSelector((state) => state.tags);
  const { locale } = useSelector((state) => state.languages);

  let title: string, description: string;

  if (category) {
    title = locale === "en_US" ? category.name_en_US : category.name;
    description =
      locale === "en_US" ? category.description_en_US : category.description;
  } else if (tag) {
    title = tag.name;
    description = tag.description;
  }

  return (
    <div className={styles.header}>
      <div className={styles.imageWrapper}>
        <div className={styles.backgroundOverlay}></div>
        <Image
          src={
            category &&
            category.category_image &&
            category.category_image !== null &&
            category.category_image.indexOf("null") === -1
              ? generateImageUrl(category.category_image)
              : postHeader
          }
          className={styles.headerImage}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1>{title}</h1>
    </div>
  );
};

export default PostsHeader;
