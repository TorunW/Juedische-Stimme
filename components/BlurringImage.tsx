import React, { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

function BlurringImage({
  svg,
  img,
  alt,
  style,
  blurLevel = 5,
  height = undefined,
  width = undefined,
  ...props
}) {
  const [hasPlaceholder, setHasPlaceholder] = useState(true);
  const Svg = svg[0];
  const svgProps = svg[1];
  const rectangles = svg[2];

  // console.log(img, " IMG ")

  return (
    <div>
      {hasPlaceholder && (
        <Svg
          {...svgProps}
          style={{ ...svgProps.style, filter: `${blurLevel}px` }}
        >
          {rectangles.map((Rect, rectProps) => {
            <Rect {...rectProps} key={`${rectProps.x}${rectProps.y}`} />;
          })}
        </Svg>
      )}
      <Image
        {...img}
        {...props}
        height={height}
        width={width}
        alt={alt}
        onLoadingComplete={() => setHasPlaceholder(false)}
      />
    </div>
  );
}

// const Container = styled.div`
//   position: relative;
//   overflow: hidden;
//   height: 100%;
//   width: 100%;
// `;

export default BlurringImage;
