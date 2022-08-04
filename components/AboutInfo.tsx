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
        <div dangerouslySetInnerHTML={{ __html: aboutInfo.text_top }}></div>
        <Gallery gallery={gallery} />
        <div dangerouslySetInnerHTML={{ __html: aboutInfo.text_bottom }}></div>
      </div>
    );
  }

  return (
    <div id='about-info' className={styles.aboutPage}>
      <h1>Über Uns</h1>
      {aboutInfoDisplay}
      <div className={styles.contentContainer}>
        <Image src={containerBackground} className={styles.img} />
        <div className={styles.linkContainer}>
          <p>Grundlagen unserer Arbeit sind:</p>
          <div className='btnContainer'>
            <button>
              <Link href={'/selbstverstaendnis'}>
                Selbsverständnis der Jüdischen Stimme
              </Link>
            </button>
            <button>
              <Link href={'/wp-content/uploads/2011/11/Satzung_2011.pdf'}>
                Satzung der Jüdischen Stimme
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutInfo;
