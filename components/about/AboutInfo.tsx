import { generateFileServerSrc } from "helpers/generateFileServerSrc";
import { getLabel } from "helpers/getLabelHelper";
import Image from "next/image";
import { useSelector } from "store/hooks";
import containerBackground from "styles/images/about.jpg";
import { Container } from "../atoms/Container";
import styles from "./Styles.module.css";

const AboutInfo = ({ aboutInfo }) => {
  const { locale } = useSelector((state) => state.languages);
  const { labels } = useSelector((state) => state.labels);

  const { parterMenu, grundlagenMenu } = useSelector((state) => state.nav);

  return (
    <section
      id="about-info"
      className={styles.aboutPage}
    >
      <h1>Über Uns</h1>
      <Container>
        {aboutInfo && aboutInfo !== null && (
          <div
            data-testid="about-info-container"
            className={styles.aboutContainer}
          >
            <div
              dangerouslySetInnerHTML={{
                __html:
                  locale === "en_US"
                    ? aboutInfo.text_top_en_US
                    : aboutInfo.text_top,
              }}
              className={styles.text}
            ></div>
            <div className={styles.menuContainer}>
              <h3 className={styles.label}>Unsere partner {"&"} freunde</h3>
              <div className={styles.imgContainer}>
                {parterMenu.map((menuItem, index) => (
                  <a
                    key={menuItem.term_id + Date.now()}
                    href={menuItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      width={100}
                      src={generateFileServerSrc(menuItem.term_image)}
                      alt={menuItem.alt}
                      title={menuItem.title}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
      <div className={styles.contentContainer}>
        <Image
          src={containerBackground}
          objectFit="cover"
        />
        <div className={styles.linkContainer}>
          <h3>
            {getLabel(
              labels,
              locale,
              "grundlagen_title",
              "Grundlagen unserer Arbeit sind:"
            )}
          </h3>
          <div className={styles.btnContainer}>
            {grundlagenMenu &&
              grundlagenMenu.map((mi) => (
                <a
                  key={mi.title}
                  href={`/${mi.link}`}
                  className={styles.linkButton}
                >
                  {mi.title}
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
