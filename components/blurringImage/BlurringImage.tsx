import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Styles.module.css';

function BlurringImage({
  svg,
  img,
  alt,
  style,
  blurLevel = 20,
  height = undefined,
  width = undefined,
  ...props
}) {
  // const [hasPlaceholder, setHasPlaceholder] = useState(true);
  const Svg = svg[0];
  const svgProps = svg[1];
  const rectangles = svg[2];

  return (
    <div className={styles.container}>
      <div className={styles.blurringImageContainer}>
        <Svg
          {...svgProps}
          style={{ ...svgProps.style, filter: `blur(${blurLevel}px)`,  transform: ["scale(1.5)", svg[1].style.transform].join(" ") }}
          height={height}
        >
          {rectangles.map(([Rect, rectProps]) => (
            <Rect {...rectProps} key={`${rectProps.x}${rectProps.y}${Date.now()}`} />
          ))}
        </Svg>
      </div>
      <Image
        {...img}
        {...props}
        className={styles.img}
        layout='fixed'
        alt={alt}
        onLoadingComplete={() => props.onLoadingComplete()}
      />
    </div>
  );
}

export default BlurringImage;
