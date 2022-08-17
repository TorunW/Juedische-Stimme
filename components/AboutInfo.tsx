import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'store/hooks';

import Image from 'next/image';

import Gallery from './Gallery';

import styles from 'styles/About.module.css';
import containerBackground from 'styles/images/about.jpg';
import Link from 'next/link';

const AboutInfo = () => {
  const { gallery } = useSelector((state) => state.aboutinfo);
  const { aboutInfo } = useSelector((state) => state.aboutinfo);

  let aboutInfoDisplay: ReactElement;
  if (aboutInfo !== null) {
    aboutInfoDisplay = (
      <div className={styles.aboutContainer}>
        <div
          dangerouslySetInnerHTML={{ __html: aboutInfo.text_top }}
          className={styles.text}
        ></div>
        <Gallery gallery={gallery} />
        <div
          dangerouslySetInnerHTML={{ __html: aboutInfo.text_bottom }}
          className={styles.text}
        ></div>
      </div>
    );
  }

  return (
    <section id='about-info' className={styles.aboutPage}>
      <h1>Über Uns</h1>
      {aboutInfoDisplay}
      <div className={styles.contentContainer}>
        <Image src={containerBackground} className={styles.img} />
        <div className={styles.linkContainer}>
          <h4>Grundlagen unserer Arbeit sind:</h4>
          <div className='link blackBg'>
            <a href={'/selbstverstaendnis'} className='link-button'>
              Selbsverständnis der Jüdischen Stimme
            </a>
            <a
              href={'/wp-content/uploads/2011/11/Satzung_2011.pdf'}
              className='link-button'
            >
              Satzung der Jüdischen Stimme
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
