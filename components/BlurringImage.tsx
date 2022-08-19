import React from 'react';
import Image from 'next/image';

function BlurringImage({ svg, img }) {
  const Svg = svg[0];
  const svgProps = svg[1];
  const rectangles = svg[2];

  // console.log(img, " IMG ")

  return (
    <div>
      <Svg style={{ ...svgProps.style, filter: `blur(5px)` }}>
        {rectangles.map((rect) => {
          const Rect = rect[0];
          const rectProps = rect[1];

          <Rect {...rectProps} key={`${rectProps.x}${rectProps.y}`} />;
        })}
      </Svg>
      <Image {...img} />
    </div>
  );
}

export default BlurringImage;
