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
      <div className={styles.blurringImageContainer}>
        <Svg
          {...svgProps}
          style={{ ...svgProps.style, filter: `blur(${blurLevel}px)` }}
          height={height}
        >
          {rectangles.map(([Rect, rectProps]) => (
            <Rect {...rectProps} key={`${rectProps.x}${rectProps.y}`} />
          ))}
        </Svg>
      </div>
      <Image
        {...img}
        {...props}
        className={styles.img}
        layout='fixed'
        alt={alt}
        onLoadingComplete={() => setHasPlaceholder(false)}
      />
    </div>
  );
}

export default BlurringImage;
