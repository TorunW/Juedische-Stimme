import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Styles.module.css';

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

  return (
    <div className={styles.container}>
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
        className={styles.img}
        alt={alt}
        onLoadingComplete={() => setHasPlaceholder(false)}
      />
    </div>
  );
}

export default BlurringImage;
