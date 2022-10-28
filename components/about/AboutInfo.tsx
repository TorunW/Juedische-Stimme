import React, { useEffect, useState } from 'react';
import { useSelector } from 'store/hooks';
import Image from 'next/image';
import Gallery from '../gallery/Gallery';
import styles from './Styles.module.css';
import containerBackground from 'styles/images/about.jpg';
import { Container } from '../atoms/Container';
import { generateImageUrl } from 'helpers/imageUrlHelper';

const AboutInfo = ({ gallery, aboutInfo }) => {
  let [galleryImages, setGalleryImages] = React.useState([]);
  const { locale } = useSelector((state) => state.languages);
  const { parterMenu } = useSelector((state) => state.nav);

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
            <div className={styles.menuContainer}>
              <h3 className={styles.label}>Unsere partner {'&'} freunde</h3>
              <div className={styles.imgContainer}>
                {parterMenu.map((menuItem, index) => (
                  <a
                    key={menuItem.term_id + Date.now()}
                    href={menuItem.link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      width={100}
                      src={generateImageUrl(menuItem.term_image)}
                      alt={menuItem.alt}
                      title={menuItem.title}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* {galleryImages.length > 0 ? <Gallery images={galleryImages} /> : ''} */}
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
