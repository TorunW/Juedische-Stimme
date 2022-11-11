import React, { useState } from "react";

type Props = {
  src: string;
  alt: string;
  title: string;
  width?: string | number;
  height?: string | number;
};

export const ImageWithFallback = ({
  src,
  alt,
  title,
  width,
  height,
}: Props) => {
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
