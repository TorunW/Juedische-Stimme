import React from 'react';

function BlurringImage({ svg }) {
  const Svg = svg[0];
  const svgProps = svg[1];
  const rectangles = svg[2];

  return (
    <Svg {...svgProps}>
      {rectangles.map((rect) => {
        const Rect = rect[0];
        const rectProps = rect[1];

        <Rect {...rectProps} key={`${rectProps.x}${rectProps.y}`} />;
      })}
    </Svg>
  );
}

export default BlurringImage;
