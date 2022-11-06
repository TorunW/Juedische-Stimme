import { generateImageUrl } from "helpers/imageUrlHelper";
import React, { useState } from "react";

export const PostImage = ({ image, alt, title, style }) => {
  const [hideImage, setHideImage] = useState(false);
  return (
    <>
      {!hideImage && (
        <img
          src={generateImageUrl(image)}
          alt={alt}
          title={title}
          style={style ?? { margin: "20px auto" }}
          onError={() => setHideImage(true)}
        />
      )}
    </>
  );
};
