import React, { useEffect, useState } from 'react';
import { useSelector } from 'store/hooks';
import Image from 'next/image';
import Gallery from '../gallery/Gallery';
import styles from './Styles.module.css';
import containerBackground from 'styles/images/about.jpg';
import { Container } from '../atoms/Container';

const AboutInfo = ({ gallery, aboutInfo }) => {
  let [galleryImages, setGalleryImages] = useState([]);
  const { locale } = useSelector((state) => state.languages);
  useEffect(() => {
    if (gallery !== null) getGalleryImages();
  }, [gallery]);

  async function getGalleryImages() {
    const res = await fetch(`/api/galleryimage/${gallery.gallery_id}`);
    const data = await res.json();
    setGalleryImages(data);
  }

  return (
    <section id='about-info' className={styles.aboutPage}>
      <h1>Über Uns</h1>
      <Container>
        {aboutInfo && aboutInfo !== null && (
          <div
            data-testid='about-info-container'
            className={styles.aboutContainer}
          >
            <div
              dangerouslySetInnerHTML={{
                __html:
                  locale === 'en_US'
                    ? aboutInfo.text_top_en_US
                    : aboutInfo.text_top,
              }}
              className={styles.text}
            ></div>
            {galleryImages.length > 0 ? <Gallery images={galleryImages} /> : ''}
          </div>
        )}
      </Container>
      <div className={styles.contentContainer}>
        <Image src={containerBackground} objectFit='cover' />
        <div className={styles.linkContainer}>
          <h3>Grundlagen unserer Arbeit sind:</h3>
          <div className={styles.btnContainer}>
            <a href={'/selbstverstaendnis'} className={styles.linkButton}>
              Selbsverständnis der Jüdischen Stimme
            </a>
            <a
              href={'/wp-content/uploads/2011/11/Satzung_2011.pdf'}
              className={styles.linkButton}
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
