import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'store/hooks';
import Gallery from './Gallery';
import styles from 'styles/About.module.css';

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
        <img src='about.jpg' />
        <div className={styles.linkContainer}>
          <p>Grundlagen unserer Arbeit sind</p>
          <div className={styles.btnContainer}>
            <button>Selbsverständnis der Jüdischen Stimme</button>
            <button>Satzung der Jüdischen Stimme</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutInfo;
