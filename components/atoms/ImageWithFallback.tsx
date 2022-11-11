import React, { useState } from "react";

export const ImageWithFallback = ({ src, alt, title, width, height }) => {
  const [showImage, setShowImage] = useState(
    src.indexOf("null") === -1 ? true : false
  );
  return (
    <>
      {showImage && (
        <img
          src={src}
          alt={alt}
          title={title}
          width={width}
          height={height}
        />
      )}
    </>
  );
};
